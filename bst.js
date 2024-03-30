function createNode(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

function Tree(arr) {
  arr = [...new Set(arr)];
  arr.sort((a, b) => a - b);

  let root = buildTree(arr, 0, arr.length - 1);

  function buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const node = createNode(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
  }

  function printTree(node = root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      printTree(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  function insertHelperFunction(value, node) {
    if (value < node.data && node.left == null) {
      node.left = createNode(value);
      return;
    }

    if (value < node.data && node.left != null) {
      insertHelperFunction(value, node.left);
      return;
    }

    if (value > node.data && node.right == null) {
      node.right = createNode(value);
      return;
    }

    if (value > node.data && node.right != null) {
      insertHelperFunction(value, node.right);
      return;
    }

    if (value === node.data) {
      return;
    }
  }

  function insert(value) {
    insertHelperFunction(value, root);
  }

  function deleteItemHelperFunction(value, node) {
    if (node == null) return null;

    if (value < node.data) {
      node.left = deleteItemHelperFunction(value, node.left);
      return node;
    } else if (value > node.data) {
      node.right = deleteItemHelperFunction(value, node.right);
      return node;
    } else {
      if (node.left == null && node.right == null) {
        delete node;
        return null;
      } else if (node.left == null) {
        const tmp = node.right;
        delete node;
        return tmp;
      } else if (node.right == null) {
        const tmp = node.left;
        delete node;
        return tmp;
      } else {
        const tmp = findMin(node.right);
        node.data = tmp.data;
        node.right = deleteItemHelperFunction(tmp.data, node.right);
        return node;
      }
    }
  }

  function deleteItem(value) {
    deleteItemHelperFunction(value, root);
  }

  function findMin(root) {
    if (root.left == null) return root;
    return findMin(root.left);
  }

  function findHelperFunction(value, node) {
    if (node == null) return null;
    else if (node.data === value) return node;
    else if (value < node.data) return findHelperFunction(value, node.left);
    else if (value > node.data) return findHelperFunction(value, node.right);
  }

  function find(value) {
    return findHelperFunction(value, root);
  }

  function levelOrderHelperFunction(node, callback, arr) {
    if (node == null) return null;
    const q = [];
    if (callback) callback(node.data);
    else arr.push(node.data);

    q.push(node.left);
    q.push(node.right);

    while (!(q.length === 0)) {
      const temp = q.shift();

      if (temp == null) continue;

      if (callback) callback(temp.data);
      else arr.push(temp.data);

      q.push(temp.left);
      q.push(temp.right);
    }

    if (!callback) return arr;
  }

  function levelOrder(callback = null) {
    const arr = [];
    return levelOrderHelperFunction(root, callback, arr);
  }

  function inOrderHelperFunction(node, callback, arr) {
    if (node == null) return;

    inOrderHelperFunction(node.left, callback, arr);

    if (callback) callback(node.data);
    else arr.push(node.data);

    inOrderHelperFunction(node.right, callback, arr);

    if (!callback) return arr;
  }

  function inOrder(callback = null) {
    const arr = [];
    return inOrderHelperFunction(root, callback, arr);
  }

  function preOrderHelperFunction(node, callback, arr) {
    if (node == null) return;

    if (callback) callback(node.data);
    else arr.push(node.data);

    preOrderHelperFunction(node.left, callback, arr);
    preOrderHelperFunction(node.right, callback, arr);

    if (!callback) return arr;
  }

  function preOrder(callback = null) {
    const arr = [];
    return preOrderHelperFunction(root, callback, arr);
  }

  function postOrderHelperFunction(node, callback, arr) {
    if (node == null) return;

    postOrderHelperFunction(node.left, callback, arr);
    postOrderHelperFunction(node.right, callback, arr);

    if (callback) callback(node.data);
    else arr.push(node.data);

    if (!callback) return arr;
  }

  function postOrder(callback = null) {
    const arr = [];
    return postOrderHelperFunction(root, callback, arr);
  }

  function heightHelperFunction(node = root) {
    if (node == null) return 0;

    if (node.left == null && node.right == null) return 0;

    const leftHeight = 1 + heightHelperFunction(node.left);
    const rightHeight = 1 + heightHelperFunction(node.right);

    return Math.max(leftHeight, rightHeight);
  }

  function height(nodeVal = root.data) {
    const node = find(nodeVal);
    return heightHelperFunction(node);
  }

  function depthHelperFunction(node, curr) {
    if (node === curr) return 0;

    if (node.data < curr.data) return 1 + depthHelperFunction(node, curr.left);
    else return 1 + depthHelperFunction(node, curr.right);
  }

  function depth(nodeVal) {
    const node = find(nodeVal);
    return depthHelperFunction(node, root);
  }

  function isBalancedHelperFunction(node) {
    if (node == null) return true;
    if (
      Math.abs(
        heightHelperFunction(node.left) - heightHelperFunction(node.right)
      ) > 1
    )
      return false;

    if (
      isBalancedHelperFunction(node.left) &&
      isBalancedHelperFunction(node.right)
    )
      return true;
    else return false;
  }

  function isBalanced() {
    return isBalancedHelperFunction(root);
  }

  function rebalance() {
    const arr = inOrder();
    root = buildTree(arr, 0, arr.length - 1);
  }

  return {
    printTree,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

/* -------Driver Script-------- */

function generateRandomArray() {
  const length = Math.floor(Math.random() * 51) + 50; // Random length between 50 and 100
  const randomArray = [];

  for (let i = 0; i < length; i++) {
    randomArray.push(Math.floor(Math.random() * 501)); // Random number between 0 and 500
  }

  return randomArray;
}

console.log("Building Tree...");

const myTree = Tree(generateRandomArray());

if (myTree.isBalanced()) console.log("Tree is Balanced");
else console.log("Tree is not Balanced");

console.log("");

myTree.printTree();

console.log("");

console.log("Traversing level order...");
console.log(myTree.levelOrder());

console.log("");

console.log("Traversing pre order...");
console.log(myTree.preOrder());

console.log("");

console.log("Traversing post order...");
console.log(myTree.postOrder());

console.log("");

console.log("Traversing in order...");
console.log(myTree.inOrder());

const newArr = generateRandomArray();

console.log("");

console.log("Inserting several elements...");
for (el of newArr) myTree.insert(el);

console.log("");

if (myTree.isBalanced()) console.log("Tree is Balanced");
else console.log("Tree is not Balanced");

console.log("");

console.log("Rebalancing Tree...");
myTree.rebalance();

console.log("");

if (myTree.isBalanced()) console.log("Tree is Balanced");
else console.log("Tree is not Balanced");

console.log("");

console.log("Traversing level order...");
console.log(myTree.levelOrder());

console.log("");

console.log("Traversing pre order...");
console.log(myTree.preOrder());

console.log("");

console.log("Traversing post order...");
console.log(myTree.postOrder());

console.log("");

console.log("Traversing in order...");
console.log(myTree.inOrder());
