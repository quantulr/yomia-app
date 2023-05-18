import { MenuItem } from "@/types/menu.ts";

/**
 * 将扁平数据转换为树形数据
 * @param flatData
 * @param config
 */
export const buildMenuTree = (
  flatData: MenuItem[],
  config: { rootKey: any } = { rootKey: 0 }
) => {
  const tree: MenuItem[] = [];

  // 将扁平数据按照父节点ID分组
  const groups = flatData.reduce((acc: any, node) => {
    const key = node.parentId;
    acc[key] = acc[key] || [];
    acc[key].push(node);
    return acc;
  }, {});

  function buildNode(node: MenuItem, level: number) {
    const children = groups[node.menuId];
    if (children) {
      node.children = children.map((child: MenuItem) =>
        buildNode(child, level + 1)
      );
    }
    node.treeLevel = level;
    return node;
  }

  // 从根节点开始构建树
  const roots = groups[config.rootKey];
  if (roots) {
    tree.push(...roots.map((root: MenuItem) => buildNode(root, 0)));
  }
  return tree;
};
