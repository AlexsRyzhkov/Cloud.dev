import {useDiskContext} from "@/components/disk/disk-provider/DiskProvider";
import {DiskCard} from "@/components/disk/disk-card/DiskCard";
import {useRef} from "react";
import {ContextMenu} from "primereact/contextmenu";


const DiskList = () => {
    const {value: {folderData}} = useDiskContext()

    const cm = useRef(null);
    const items = [
        { label: 'Редактировать', icon: 'pi pi-copy' },
        { label: 'Удалить', icon: 'pi pi-file-edit' }
    ];


    return (
        <div className={'flex gap-[15px] flex-wrap'}>
            <ContextMenu model={items} ref={cm} breakpoint="767px" />
            {folderData.map((item)=>{

                return (
                    <DiskCard {...item} key={item.id} cm={cm}/>
                )
            })}
        </div>
    )
}

export {DiskList}