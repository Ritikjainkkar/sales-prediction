export function getChartData(pred) {
    return pred.rows.map((e) => {
        return e.forecasted_sales_quantity.toFixed(2)
    })
}

export function getChartLabels(pred) {
    return pred.rows.map((e) => {
        return e.date.toString().substring(0,15);
    }).slice(0,15)
}

export function getIsOpenStore(weatherData, pred) {
    const avgTemp = weatherData.days.map((d) => {
        return ((d.tempmax + d.tempmin)/2).toFixed(2);
    })

    const finalData = []
    const isOpen = []

    for(let i=0;i<pred.length-2;i++) {
        const isWeatherGood = !(avgTemp[i] < 5 && avgTemp[i+1] < 5 && avgTemp[i+2] < 5);
        const nextThreeDaysTotalSale = (Number(pred[i]) + Number(pred[1+i]) + Number(pred[i+2])).toFixed(2);
        finalData.push({
            isWeatherGood,
            nextThreeDaysTotalSale
        })
    }
    for(let i=0;i<finalData.length;i++) {
        if(!(isOpen[i-1] || false) && !(isOpen[i-2] || false) && !(isOpen[i-3] || false)) {
            isOpen.push(true);
        } else {
            if(finalData[i].nextThreeDaysTotalSale < 1000) {
                isOpen.push(false);
            } else {
                if(!finalData[i].isWeatherGood && finalData[i].nextThreeDaysTotalSale < 1500) {
                    isOpen.push(false);
                } else {
                    isOpen.push(true)
                }
            }
        }
    }

    return {
        avgTemp : avgTemp.map((temp) => temp * 10).slice(0,15),
        isOpen: isOpen.slice(0,15),
    }
}