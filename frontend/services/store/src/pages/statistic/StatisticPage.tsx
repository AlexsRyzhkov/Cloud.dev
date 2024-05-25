import {Chart} from "primereact/chart";


const StatisticPage = () => {
    const data = {
        labels: ['Свободно', 'Занято'],
        datasets: [
            {
                data: [10, 2],
                backgroundColor: [
                    '#30B4B7',
                    '#355178'
                ],
                hoverBackgroundColor: [
                    '#53abae',
                    '#748aaa'
                ]
            }
        ]
    };

    const polarAreaData = {
        datasets: [
            {
                data: [11, 16, 7],
                backgroundColor: [
                    '#f30c34',
                    '#2e68f7',
                    '#FFCD56'
                ],
            }
        ],
        labels: ['Pdf', 'Docx', 'Изображение']
    };

    return (
        <div className={'flex flex-col gap-[40px]'}>
            <h1 className={'text-[#616161] text-[24px] font-bold'}>Статистика</h1>
            <section className={'flex gap-[20px]'}>
                <Chart type="doughnut" data={data} className="w-[400px]"/>
                <Chart type="polarArea" data={polarAreaData} className="w-[400px]" />
            </section>
        </div>
    )
}

export {StatisticPage}