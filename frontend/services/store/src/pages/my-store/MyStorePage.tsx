import {DiskProvider} from "@/components/disk/disk-provider/DiskProvider";
import {DiskList} from "@/components/disk/disk-list/DiskList";
import {Toast} from "primereact/toast";
import React, {useRef} from "react";
import {FileUpload} from "primereact/fileupload";
import {Link, useParams} from "react-router-dom";
import {BreadCrumb} from "primereact/breadcrumb";


const MyStorePage = () => {
    const params = useParams();
    console.log(params)


    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const fileUploadRef = useRef(null);

    const onUploadFile = async (event:any) => {

        const file = event.files[0];

        fileUploadRef.current.clear()
    };

    const onRemoveFile = (file:any, callback:any) => {
        callback();
    };

    const items = [
        { label: 'Components' },
        { label: 'Form' },
        {
            label: 'InputText',
            template: () => <Link to="/inputtext"><a className="text-primary font-semibold">InputText</a></Link>
        }
    ];
    const home = { icon: 'pi pi-home', url: 'https://primereact.org' };

    return (
        <div className={'flex flex-col gap-[40px]'}>
            <div className={'flex items-center justify-between gap-[100px]'}>
                <h1 className={'text-[#616161] text-[24px] font-bold'}>Мой диск</h1>
                <div className="card flex">
                    <Toast ref={toast}></Toast>
                    <FileUpload ref={fileUploadRef} mode="basic" customUpload uploadHandler={onUploadFile} chooseLabel={'Загрузить'} chooseOptions={{className:'bg-[#35B3B5] text-[14px]'}}/>
                </div>
            </div>
            <div>
                <BreadCrumb model={items} home={home} />
            </div>
            <div>
                <DiskProvider>
                    <DiskList/>
                </DiskProvider>
            </div>
        </div>
    )
}

export {MyStorePage}