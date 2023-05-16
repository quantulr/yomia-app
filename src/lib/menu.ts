import {MenuItem} from "@/types/menu.ts";

/**
 * 将扁平数据转换为树形数据
 * @param flatData
 */
export const buildMenuTree = (flatData: MenuItem[]) => {
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
    const roots = groups[0];
    if (roots) {
        tree.push(...roots.map((root: MenuItem) => buildNode(root, 0)));
    }
    return tree;
};

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
