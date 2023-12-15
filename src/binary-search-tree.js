const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithin(this.rootNode, data);
    function addWithin(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (value < node.data) {
        node.left = addWithin(node.left, value);
      } else {
        node.right = addWithin(node.right, value);
      }
      return node;
    }
  }

  has(data) {
    let curNode = this.rootNode;
    while (curNode) {
      if (data === curNode.data) {
        return true;
      }
      if (data < curNode.data) {
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
    }
    return false;
  }

  find(data) {
    let curNode = this.rootNode;
    while (curNode) {
      if (data === curNode.data) {
        return curNode;
      }
      if (data < curNode.data) {
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
    }
    return null;
  }

  remove(data) {
    this.root = removeNode(this.rootNode, data);
    function removeNode(node, value) {
      if (!node) {
        return null;
      }
      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minFromRight = findMin(node.right);
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
        function findMin(node) {
          while (node.left) {
            node = node.left;
          }
          return node;
        }
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return;
    }
    let curNode = this.rootNode;
    while (curNode.left) {
      curNode = curNode.left;
    }
    return curNode.data;
  }

  max() {
    let curNode = this.rootNode;
    if (!curNode) {
      return;
    }
    while (curNode.right) {
      curNode = curNode.right;
    }
    return curNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
