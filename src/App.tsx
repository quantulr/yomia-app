import './App.css'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TableSelectionCell
} from "@fluentui/react-components";
import {usePosts} from "./api/posts.ts";
// import Login from "./pages/login.tsx";

// const fetcher = (url: string) => fetch(url).then(response => response.json())

function App() {
    const {posts, isLoading, isError} = usePosts()
    return (
        <div className={"2xl:container"}>
            {/*<Login/>*/}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>
                            {/*<TableCellLayout>*/}
                            {/*    <Avatar image={{src: faker.image.avatar()}}/>*/}
                            {/*</TableCellLayout>*/}
                        </TableHeaderCell>
                        <TableHeaderCell>
                            userId
                        </TableHeaderCell>
                        <TableHeaderCell>
                            id
                        </TableHeaderCell>
                        <TableHeaderCell>
                            title
                        </TableHeaderCell>
                        <TableHeaderCell>
                            body
                        </TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && !isError ? null : posts.map((el) => <TableRow key={el.id}>
                        <TableSelectionCell></TableSelectionCell>
                        <TableCell>{el.id}</TableCell>
                        <TableCell>{el.userId}</TableCell>
                        <TableCell>{el.title}</TableCell>
                        <TableCell>{el.body}</TableCell>
                        {/*<TableCell>*/}
                        {/*    <TableCellLayout>*/}
                        {/*        /!*<InfoButton>删除</InfoButton>*!/*/}
                        {/*        <CounterBadge count={10}>*/}
                        {/*            /!*<Button/>*!/*/}
                        {/*        </CounterBadge>*/}
                        {/*    </TableCellLayout>*/}
                        {/*</TableCell>*/}
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    )
}

export default App
