import { MenuItem } from "@/types/menu.ts";

export function buildMenuTree(flatData: MenuItem[]) {
  let tree: MenuItem[] = [];

  // 将扁平数据按照父节点ID分组
  const groups = flatData.reduce((acc: any, node) => {
    const key = node.parentId;
    acc[key] = acc[key] || [];
    acc[key].push(node);
    return acc;
  }, {});

  function buildNode(node: MenuItem) {
    if (node.parentId === 0) {
      node.treeLevel = 0;
    }
    const children = groups[node.menuId];
    if (children) {
      node.children = children.map(buildNode);
      node.children.forEach((node) => node.treeLevel + 1);
    }
    return node;
  }

  // 从根节点开始构建树
  const roots = groups[0];
  if (roots) {
    tree = roots.map(buildNode);
  }

  return tree;
}

export function calculateMenuTreeLevel(data: MenuItem[], elementId: number) {
  // 递归遍历树形结构，查找匹配的元素
  function findElement(node: MenuItem | null, level: number): number {
    if (node?.menuId === elementId) {
      return level; // 找到匹配的元素，返回当前层级
    }
    // 遍历子节点
    for (const child of node?.children ??
      data.filter((node) => node.parentId === 0)) {
      const result = findElement(child, level + 1);
      if (result !== -1) {
        return result; // 在子节点中找到匹配的元素，返回层级
      }
    }
    return -1; // 在当前节点及其子节点中未找到匹配的元素
  }

  // 创建根节点
  // const root: MenuItem = {
  //     menuId: 0,
  //     children: data.filter(node => node.parentId === null)
  // };

  // 调用递归函数开始查找元素的层级
  return findElement(null, 0);
}
