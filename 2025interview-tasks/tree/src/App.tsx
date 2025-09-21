import {useState} from "react";

function App() {
    return (
        <Tree/>
    )
}

export default App;


const data: TreeNode[] = [
    {
        id: 1, name: "Alpha Group",
        children: []
    },
    {
        id: 2, name: "Betta Group",
        children: [
            {id: 3, name: "Group A", children: []},
            {id: 4, name: "Group B", children: []},
            {id: 5, name: "Group C", children: []}
        ]
    },
    {
        id: 6, name: "Gamma Group",
        children: [
            {
                id: 7, name: "Gold Group",
                children: [
                    {
                        id: 8, name: "Silver Group",
                        children: [
                            {
                                id: 9, name: "Bronze Group",
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

interface TreeNode {
    id: number;
    name: string;
    children: TreeNode[];
}

// function Tree() {
//     return (
//         <>
//             <h1>Tree</h1>
//             <TreeNone data={data}/>
//         </>
//     )
// }
//
// function TreeNone({data}: { data: TreeNode[] }) {
//     const [expand, setExpand] = useState<boolean>(true);
//
//
//     const toggleExpand = () => {
//         setExpand(!expand);
//     }
//
//     return (
//         <ul>
//             {data.map(treeNodeItem => (
//                 <li key={treeNodeItem.id}>
//                     <span onClick={toggleExpand} style={{cursor: 'pointer'}}>{treeNodeItem.name}</span>
//                     {expand && treeNodeItem.children.length > 0 && <TreeNone data={treeNodeItem.children}/>}
//                 </li>
//             ))}
//         </ul>
//     )
// }

function Tree() {
    return (
        <>
            <h1>Tree</h1>
            <ul>
                {data.map(treeNodeItem => <TreeNone data={treeNodeItem}/>)}
            </ul>
        </>
    )
}

function TreeNone({data}: { data: TreeNode }) {
    const [expand, setExpand] = useState<boolean>(true);

    const toggleExpand = () => {
        setExpand(!expand);
    }

    return (
        <li>
            <span onClick={toggleExpand} style={{cursor: 'pointer'}}>{data.name}</span>
            {data.children.length > 0 && expand && (
                <ul>
                    {data.children.map(treeNodeItem => <TreeNone data={treeNodeItem}/>)}
                </ul>
            )}
        </li>
    )
}