import {
  Badge,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
} from "@fluentui/react-components";
import { useMenus } from "@/api/system/menu.ts";
import { MenuItem } from "@/types/menu.ts";
import { buildMenuTree } from "@/lib/menu.ts";
import Icon from "@/components/Icon.tsx";
import { FaCalculator, FcExpand } from "react-icons/all";
import { useMemo, useState } from "react";

const columns: TableColumnDefinition<MenuItem>[] = [
  createTableColumn<MenuItem>({
    compare(a: MenuItem, b: MenuItem): number {
      return 0;
    },
    columnId: "menuName",
    // compare(a: MenuItem, b: MenuItem): number {
    //     return 1;
    // },
    renderCell(item: MenuItem): React.ReactNode {
      return (
        <TableCellLayout>
          <div className={"flex items-center"}>
            {item.children.length > 0 && (
              <Icon
                onClick={() => {
                  console.log(item);
                }}
                as={<FcExpand />}
              />
            )}{" "}
            <span className={"ml-2"}>{item.menuName}</span>
          </div>
        </TableCellLayout>
      );
    },
    renderHeaderCell(): React.ReactNode {
      return "菜单名称";
    },
  }),
  createTableColumn<MenuItem>({
    columnId: "createTime",
    // compare(a: MenuItem, b: MenuItem): number {
    //     return 0;
    // },
    renderCell(item: MenuItem): React.ReactNode {
      return item.createTime;
    },
    renderHeaderCell(): React.ReactNode {
      return "创建时间";
    },
  }),
  createTableColumn<MenuItem>({
    columnId: "status",
    renderCell(item: MenuItem): React.ReactNode {
      return (
        <TableCellLayout>
          <Badge shape={"rounded"}>{item.status}</Badge>
        </TableCellLayout>
      );
    },
    renderHeaderCell(): React.ReactNode {
      return "菜单名称";
    },
  }),
];

const Menu = () => {
  const { menus, isLoading } = useMenus((data) => {
    console.log(data);
  });
  const [expandIds] = useState(new Set([1]));

  const renderMenus = useMemo(() => {
    if (!menus?.data) return [];
    const result = [];
    result.push(...buildMenuTree(menus.data));
    for (const expandId of expandIds) {
      const expandIndex = result.findIndex((el) => el.menuId === expandId);
      expandIndex !== -1 &&
        result.splice(expandIndex, 0, ...result[expandIndex].children);
    }
    return result;
  }, [menus, expandIds]);

  return (
    <>
      {isLoading ? (
        <Icon as={<FaCalculator />} />
      ) : (
        <DataGrid columns={columns} items={renderMenus}>
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridCell>{renderHeaderCell()}</DataGridCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<MenuItem>>
            {({ item, rowId }) => (
              <DataGridRow<MenuItem> key={rowId}>
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      )}
    </>
  );
};

export default Menu;
