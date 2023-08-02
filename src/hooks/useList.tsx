import React, { useRef, useState } from "react";

export const useList = (initialState: Array<any> = []) => {
    const lastUniqueId = useRef(0);
    const [list, setList] = useState(
        initialState.map(item => {
            lastUniqueId.current++;
            return {data: item, _id: lastUniqueId.current}
        })
    );

    const insert = (data: any) => {
        lastUniqueId.current++;
        setList([...list, {data, _id: lastUniqueId.current}])
    }

    const insertAt = (index: number, data: any) => {
        lastUniqueId.current++;
        setList(
            [
                ...list.slice(0, index),
                {data, _id: lastUniqueId.current},
                ...list.slice(index, list.length - 1)
            ]
        )
    }

    const replaceAt = (index: number, data: any) => {
        setList(
            [
                ...list.slice(0, index),
                {data, _id: list[index]._id},
                ...list.slice(index + 1, list.length)
            ]
        )
    }

    const removeAt = (index: number) => {
        setList(
            [
                ...list.slice(0, index),
                ...list.slice(index + 1, list.length)
            ]
        )
    }

    const sort = (key: string) => { 
        const emptyList = list.filter(item => !item.data[key])
        const sortedList =  list.filter(item => item.data[key]).sort((a, b) => Number(a.data[key]) < Number(b.data[key]) ? 1 : -1);
        setList([...sortedList, ...emptyList]);
    }

    const replaceList = (newList: Array<any>) => {
        lastUniqueId.current = 0;
        setList(
            newList.map(item => {
                lastUniqueId.current++;
                return {data: item, _id: lastUniqueId.current}
            })
        );
    }

    return {
        insert,
        insertAt,
        replaceAt,
        removeAt,
        sort,
        replaceList,
        list: list.map(item => item.data),
        listWithIds: list
    }
}