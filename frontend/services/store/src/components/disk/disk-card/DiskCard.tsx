import classNames from "classnames";
import pdfImg from '@/assert/pdf.png'
import docxImg from '@/assert/docx.png'
import {ContextMenu} from "primereact/contextmenu";
import {useRef} from "react";
import {Link} from "react-router-dom";


interface IDiskCard {
    id: number,
    file?: string,
    parent: number,
    name: string,
    extension: string,
    is_dir: boolean,
    cm: any
}

const noFileExtention = ['.pdf','.docx','.png','.jpeg','.gif','.raw', '.tiff', '.jpg']

const DiskCard = (data: IDiskCard) => {

    const cm = data.cm
    const cardContainerCss = 'bg-[#61BDBE] w-[200px] flex gap-[15px] py-[12px] px-[20px] items-center rounded-md'
    const cardIconCss = 'pi text-[white] text-[24px]'
    const cardTextCss = 'text-[16px] text-white font-semibold'

    const onRightClick = (event:any) => {
        if (cm.current) {
            cm.current.show(event);
        }
    };

    return (
        <div onContextMenu={(e) => onRightClick(e)}>
            {data.is_dir && (
                <Link className={cardContainerCss} to={`/${data.id}`}>
                    <i className={classNames(
                        cardIconCss,
                        'pi-folder cursor-pointer'
                    )}></i>
                    <p className={cardTextCss}>{data.name}</p>
                </Link>
            )}
            {data.extension === '.pdf' && (
                <div className={classNames(cardContainerCss, 'bg-[#FF7878]')}>
                    <img src={pdfImg} alt={'pdf'} className={'w-[25px]'}/>
                    <p className={cardTextCss}>{data.name}</p>
                </div>
            )}
            {data.extension === '.docx' && (
                <div className={classNames(cardContainerCss, 'bg-[#68BCFF]')}>
                    <img src={docxImg} alt={'pdf'} className={'w-[25px]'}/>
                    <p className={cardTextCss}>{data.name}</p>
                </div>
            )}
            {['.png', '.jpeg', '.gif', '.raw', '.tiff', '.jpg'].includes(data.extension) && (
                <div className={cardContainerCss}>
                    <i className={classNames(
                        cardIconCss,
                        'pi-image'
                    )}></i>
                    <p className={cardTextCss}>{data.name}</p>
                </div>
            )}
            {!noFileExtention.includes(data.extension) && !data.is_dir && (
                <div className={classNames(cardContainerCss, 'bg-[#515F6B]')}>
                    <i className={classNames(
                        cardIconCss,
                        'pi-file'
                    )}></i>
                    <p className={cardTextCss}>{data.name}</p>
                </div>
            )}
        </div>
    )
}

export {DiskCard}