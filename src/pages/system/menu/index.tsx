import {
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from "@fluentui/react-components";
import {useMenus} from "@/api/system/menu.ts";
import {useState} from "react";
import {buildMenuTree} from "@/lib/menu.ts";
import Icon from "@/components/Icon.tsx";
import {FcCollapse, FcExpand} from "react-icons/all";
import {MenuItem} from "@/types/menu.ts";
import {cloneDeep} from "lodash-es";

const Menu = () => {
    const [renderMenuList, setRenderMenuList] = useState<MenuItem[]>([])
    const {isLoading} = useMenus({
        onSuccess: (data) => {
            console.log(data)
            if (!data.data) {
                return setRenderMenuList(() => [])
            }
            const menuTree = buildMenuTree(data.data)
            setRenderMenuList(() => menuTree)
        }
    });
    return (
        <>
            {isLoading ? (
                <div className={"w-full h-full flex justify-center items-center"}>
                    <Spinner/>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>菜单名称</TableHeaderCell>
                            <TableHeaderCell>组件路径</TableHeaderCell>
                            <TableHeaderCell>创建时间</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {renderMenuList.map((menuItem, menuIndex) => (
                            <TableRow key={menuItem.menuId}>
                                <TableCell>
                                    <TableCellLayout>
                                        <div className={"flex items-center"}>
                                            {!!menuItem.treeLevel && [...Array(menuItem.treeLevel).keys()].map(el =>
                                                <div
                                                    key={el}
                                                    className={'w-8'}></div>)}{menuItem.children.length > 0 && (
                                            renderMenuList[menuIndex + 1].parentId === menuItem.menuId ?
                                                // 折叠按钮
                                                <Icon onClick={() => {
                                                    setRenderMenuList(prevState => {
                                                        const result = cloneDeep(prevState);
                                                        result.splice(menuIndex + 1, menuItem.children.length)
                                                        return result
                                                    })
                                                }} className={'mr-2'} as={<FcExpand/>}/> :
                                                // 展开按钮
                                                <Icon className={'mr-2'} onClick={() => {
                                                    setRenderMenuList(prevState => {
                                                        const result = cloneDeep(prevState);
                                                        result.splice(menuIndex + 1, 0, ...menuItem.children)
                                                        return result
                                                    })
                                                }} as={<FcCollapse/>}/>

                                        )}
                                            <span>{menuItem.menuName}</span>
                                        </div>
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell>{menuItem.component}</TableCell>
                                <TableCell>{menuItem.createTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default Menu;
