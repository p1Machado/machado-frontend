export function ltreeCompare(a, b) {
  if (!a && !b) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  const aPieces = a.split(".");
  const bPieces = b.split(".");

  const result = _ltreePieceCompare(aPieces[0], bPieces[0]);

  if (result !== 0) {
    return result;
  }

  return ltreeCompare(aPieces.slice(1, aPieces.length).join("."), bPieces.slice(1, bPieces.length).join("."));
}

export function ltreeIsAncestor(a, b) {
  return a === "" || b.startsWith(a + ".");
}

export function ltreeIsDescendent(a, b) {
  return b === "" || a.startsWith(b + ".");
}

export function ltreeIsParent(a, b) {
  if (!a || !b) {
    return false;
  }
  return ltreeGetParent(b) === a;
}

export function ltreeGetAncestors(ltree) {
  const ltreePieces = ltree.split(".");
  return ltreePieces.map((_, index) => ltreePieces.slice(0, index).join("."));
}

export function ltreeGetParent(ltree) {
  const ltreePieces = ltree.split(".");
  return ltreePieces.slice(0, ltreePieces.length - 1).join(".");
}

export function ltreeUpdateChecked(state, target) {
  const checked = !target.checked;
  const nextState = [];
  const ancestorsByLtree = ltreeGetAncestors(target.ltree).reduce(
    (acc, ltree) => {
      acc[ltree] = { ltree, childrenTotal: 0, childrenChecked: 0, childrenIndeterminate: 0 };
      return acc;
    },
    { "": { ltree: "", childrenTotal: 0, childrenChecked: 0, childrenIndeterminate: 0 } },
  );
  for (let index = state.length - 1; index >= 0; index--) {
    const node = state[index];

    if (node.ltree === target.ltree || ltreeIsDescendent(node.ltree, target.ltree)) {
      nextState.unshift({ ...node, checked, indeterminate: false });
    } else if (Object.prototype.hasOwnProperty.call(ancestorsByLtree, node.ltree)) {
      if (ancestorsByLtree[node.ltree].childrenTotal === 0) {
        nextState.unshift({ ...node, checked: false, indeterminate: false });
      } else if (ancestorsByLtree[node.ltree].childrenTotal === ancestorsByLtree[node.ltree].childrenChecked) {
        nextState.unshift({ ...node, checked: true, indeterminate: false });
      } else if (
        ancestorsByLtree[node.ltree].childrenChecked + ancestorsByLtree[node.ltree].childrenIndeterminate >
        0
      ) {
        nextState.unshift({ ...node, checked: false, indeterminate: true });
      } else {
        nextState.unshift({ ...node, checked: false, indeterminate: false });
      }
    } else {
      nextState.unshift(node);
    }

    const parent = ltreeGetParent(node.ltree);

    if (parent !== "" && Object.prototype.hasOwnProperty.call(ancestorsByLtree, parent)) {
      ancestorsByLtree[parent].childrenTotal++;
      if (nextState[0].checked) {
        ancestorsByLtree[parent].childrenChecked++;
      }
      if (nextState[0].indeterminate) {
        ancestorsByLtree[parent].childrenIndeterminate++;
      }
    }
  }

  return nextState;
}

function _ltreePieceCompare(a, b) {
  if (isNaN(a)) {
    return a.localeCompare(_parseIfNumber(b));
  }

  if (isNaN(b)) {
    return b.localeCompare(_parseIfNumber(a)) * -1;
  }

  if (a * 1 > b * 1) {
    return 1;
  }
  if (a * 1 < b * 1) {
    return -1;
  }
  return 0;
}

function _parseIfNumber(value) {
  return isNaN(value) ? value : value * 1;
}
