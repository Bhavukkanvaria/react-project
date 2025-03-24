export const config = [
    {
        id:'1',
        label: 'Public',
        isFolder:true,
        children: [
            {
                id:'2',
                label:'vite.svg',
                isFolder:false
            }
        ]
    },
    {
        id:'3',
        label: 'src',
        isFolder:true,
        children: [
            {
                id:'4',
                label:'Components',
                isFolder:true,
                children:[
                    {
                        id:'5',
                        label:'file folder',
                        isFolder:true,
                        children:[{
                            id:'6',
                            label:'data.js',
                            isFolder:false
                        },
                        {
                            id:'7',
                            label:'File_Folder.jsx',
                            isFolder:false
                        },
                        {
                            id:'8',
                            label:'style.css',
                            isFolder:false
                        }]
                    }
                ]
            },
            {
                id:'9',
                label:'App.jsx',
                isFolder:false
            },
            {
                id:'10',
                label:'App.css',
                isFolder:false
            },
            {
                id:'11',
                label:'index.css',
                isFolder:false
            },
            {
                id:'12',
                label:'main.js',
                isFolder:false
            }
        ]
    },
    {
        id:'13',
        label:'index.html',
        isFolder:false
    },
    {
        id:'14',
        label: 'package.json',
        isFolder:false,
    }
]