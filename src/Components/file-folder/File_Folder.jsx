import { useState } from 'react'
import { config } from './data'
import './style.css'


const RenderListItem = ({ item, setData }) => {

    const [isOpened, setIsOpened] = useState(false);

    const onExpandCollapse = () => {
        setIsOpened(!isOpened)
    }
    const onNewFolder = (id) => {
        const name = prompt('Enter name');
        let updatedData = (list) => {
            return list.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        children: [
                            ...node.children,
                            {
                                id: Date.now().toString(),
                                label: name,
                                isFolder: true,
                                children: []
                            }
                        ]
                    }
                } else if (node.children) {
                    return {...node, children: updatedData(node.children)}
                }
                return node;
            })
        }
        if(name.length){
            setData((prev) => updatedData(prev))
        }
    }

    const onDeleteFolder = (id) => {
        const updatedData = (list) => {
            return list.filter((node) => node.id != id)
                .map((node) => {
                    if (node.children) {
                        return { ...node, children: updatedData(node.children) }
                    }
                    return node;
                })
        }
        setData((prev) => updatedData(prev))
    }

    return (
        <li className='list-item-container'>
            <div className='list-item-wrap'>
                {
                    item.isFolder && <span className='folder-icon'
                        onClick={onExpandCollapse}>
                        {/* {isOpened ? '⬇️' : '➡️'}</span> */}
                        {isOpened ? '-' : '+'}</span>
                }
                <span className='list-item-title'>{item.label}</span>
                {item.isFolder && <span className='add-folder' onClick={() => onNewFolder(item.id)}>
                    <img className='icon' src="data:image/png;base64,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" />
                </span>}
                {<span className='delete-folder' onClick={() => onDeleteFolder(item.id)}>
                    <img className='icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAABWVlbV1dUeHh7u7u6Ojo6tra19fX27u7tZWVkkJCSxsbFqamr4+PihoaGWlpZxcXFBQUFOTk7j4+PBwcHPz88vLy/d3d2NjY0TExMqKirs7OxEREQ0NDSamppgYGAMDAx6enoXFxem5IjtAAAD5ElEQVR4nO3da2OaMBhAYfB+Qbxf62xt//9/nCurENQQwxsSt/N8hUrOFGUCJooAAAAAAACAVzYcLMYdc+PFYOh7yM84DmIbg6PvgZuaWvX9MfU9dDMT68A4nvgevIlljcA4XvoefrU6z+BLPIvDmoFxHPh7anqoXfiV+o7Qsn8bzYX9hroQKFz4jtBZCQTG8cp3hkZfpDDxnaGxFync+87QsDseLRv4ztBQC/tdU/0XLTT/7B5SGAwKH6EwHBQ+QmE4KHyEwnD8b4Vr479b+yzcDEYtU6M3ZaQL078cqV9+vD2xxcGmZl+3FYeuVeu7uePZ9/gNHLo1CiW+OnPvl33guvrRg2C/L9Y9B9EU+3MdJ99DN3SyLtz6HrqhrXXhL99DN2T/VvPue+iG3q0Lu76HbqjGB6LMeQjX+vaBr/E6tX+NfmuHfmC6bNcLvFi1FTv1Wouk7VqiBu3UpS7ONY6ULdb/F6zSVrY3cr69KGp5LWw53x6F8iiUR6E0CuVRKI1CeRRKo1AehdIolEehNArlUSiNQnkUSqNQHoWqdD3bzx5dK7G5LFtXXfATeGHS+V5re+8St3V2mUCn4jansAt71/Vuz2LmZ19n2scIurB4Yqz8St0UlmmfxZAL005hxfJ9k8Vrdca6fTHkQvWisZ2ybKcs012JGnLhTFlTfSmqZ3Z1e2LIhT1lTfW9Rr3Ko6d5FArlUZijkMIMhfIozFFIYYZCeRTmKKQwQ6E8CnMUUpihUB6FOQopzFAoj8IchRRmKJRHYY5CCjMUyqMwRyGFGQrlUZijkMIMhfIozFFIYYZCeRTmKKQwQ6E820LdPTOvWjjUrKmOWzfHQMiFaXHFTmlh8b6286veu6bM91i+Pa34BGvndAy6MJpf17vd0/K9dK59jLALf27QO9+7SzT5O2ep/ibZ0Auj43Q+mSf3f6w5TS7L+lVTVYdeWB+F8iiURqE8CqVRKI9CaRTKo1AahfIolEahPAqlUSjv3y9UZ0OqO5VrtY2yvSZmQ/pQtljxZacA9TfRPpxvL4o+lS3WmOXUkDoJ46fz7d3Mp2c+NbUd9QRWvXnyDKn7RRy7mPkstyptzf1+H0XpubRR8+m3n1eer1d7Hk7MR2mr8bK/67qw6y/Lm7KfF/cZPudBdvl6KTh4Czw0E1i6yqBJFT85LMfXhOTl37F1p/yB0RT3B8FXs+rROOD+CLHAx6zrzXxSXDU/iW4T/28qSpt+FieNHM0oetWjErRvvO9ic6oemJBtEwfc90w71YMT8DVt/hX6I01ujo3FLRN/fVnkejY6jTsujE+j2dBzHgAAAAAAAGDqN1jISn+BVUnmAAAAAElFTkSuQmCC"/>
                </span>}
                
            </div>
            {
                item.isFolder && item.children && isOpened &&
                (
                    <RenderList data={item.children} setData={setData}/>
                )
            }
        </li>
    )
}


const RenderList = ({ data, setData }) => {
    return (
        <ul className='file-folder-list-wrapper'>
            {
                data && data.map((item) => {
                    return (<RenderListItem key={item.id} item={item} setData={setData}/>)
                })
            }
        </ul>
    )
}


export const FileFolder = () => {

    const [data, setData] = useState(config);

    return (
        <div className='file-folder-wrapper'>
            <h3>File Folder View</h3>
            <RenderList data={data} setData={setData}/>
        </div>
    )
}