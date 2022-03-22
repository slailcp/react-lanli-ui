
import React from 'react'

import moment from "moment";
import "./index.less"
import { getAllDate, DateObj, DateItem } from "./date"
import { useEffect, useState } from "react";

export function Calendar(props: any) {
    const {
        minDate = 'moment().format("YYYY-MM-DD")',
        maxDate = 'moment().add(1, "months").format("YYYY-MM-DD")',
        defaultDate = 'moment().format("YYYY-MM-DD")',
        isShowSectionBg = true,
        style = {},
        monthFormatter = "YYYY年MM月",
        dateFormatter = "DD",
        startWeek = 1,
        className = ""
    } = props;

    const calendarObj: DateObj = getAllDate(moment(minDate), moment(maxDate), startWeek)
    const [chooseDatelist, setChooseDatelist] = useState<string[]>([])

    useEffect(() => {
        const _defaultDate = props.defaultDate || defaultDate
        const _chooseDatelist: string[] = [];
        setChooseDatelist([])
        if (typeof _defaultDate === 'object' && Array.isArray(_defaultDate)) {
            if ((_defaultDate as any[]).length === 2) {
                const diffnum = Math.abs(moment(_defaultDate[0]).diff(moment(_defaultDate[1]), 'days'))
                for (let i = 1; i < diffnum; i++) {
                    const first = moment(_defaultDate[0]).clone();
                    _chooseDatelist.push(first.add(i, 'days').format('YYYY-MM-DD'))
                }
            }
        }
        setChooseDatelist(_chooseDatelist)
    }, [props.defaultDate])
    const dateChooseFn = (DateItem: DateItem) => {
        if (DateItem.pass || DateItem.future) { return; }
        props.onChoose(moment(DateItem.date).format("YYYY-MM-DD"))
    }

    const renderDate = () => {
        return <>
            <div className="lan-calendar-con lan-calendar-week">
                {startWeek === 0 ? <span className="lan-calendar-con-date">日</span> : ""}
                <span className="lan-calendar-con-date">一</span>
                <span className="lan-calendar-con-date">二</span>
                <span className="lan-calendar-con-date">三</span>
                <span className="lan-calendar-con-date">四</span>
                <span className="lan-calendar-con-date">五</span>
                <span className="lan-calendar-con-date">六</span>
                {startWeek === 1 ? <span className="lan-calendar-con-date">日</span> : ""}

            </div>
            <div>
                {
                    Object.keys(calendarObj).map(key => (
                        <div key={key}>
                            <div className="lan-calendar-month">{moment(calendarObj[key].month).format(monthFormatter)}</div>
                            <div className="lan-calendar-con">
                                {
                                    calendarObj[key].date.map((item, index) => {
                                        let hasDefault;

                                        if (typeof defaultDate === 'string') {
                                            hasDefault = moment(item.date).format("YYYY-MM-DD") === moment(defaultDate).format("YYYY-MM-DD")
                                        } else {
                                            hasDefault = (defaultDate as string[]).includes(moment(item.date).format("YYYY-MM-DD"))
                                        }

                                        let hasChoose = isShowSectionBg;
                                        if (isShowSectionBg) {
                                            hasChoose = (chooseDatelist as string[]).includes(moment(item.date).format("YYYY-MM-DD"))
                                        }

                                        return <div onClick={() => dateChooseFn(item)}
                                            className={`lan-calendar-con-date 
                                            ${hasDefault ? 'lan-calendar-date-active' : ''} 
                                            ${item.pass || ''} ${item.future || ''} 
                                            ${hasChoose ? 'lan-calendar-date-choose' : ''}`}
                                            key={index}>
                                            {item.date ? moment(item.date).format(dateFormatter) : ""}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    }

    return (
        <div className={className} style={style}>{renderDate()}</div>
    );
}
