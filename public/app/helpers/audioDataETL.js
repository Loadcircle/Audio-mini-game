export const audioDataETL = (data)=>{
    const transformedData = [];

    data.map(e=>{
        e.buffer = getBuffer(e.buffer);
        return e;
    });
    
    const lastSecond = Math.floor(data[data.length-1].time);

    for(let i = 0; i <= lastSecond; i++){
        const pointsPerSeconds = data.filter(e=>e.time >= i && e.time < i+1);
        const pointCol1 =  getTopBufferFromColumn(pointsPerSeconds, 0);
        const pointCol2 =  getTopBufferFromColumn(pointsPerSeconds, 1);
        const pointCol3 =  getTopBufferFromColumn(pointsPerSeconds, 2);
        const pointCol4 =  getTopBufferFromColumn(pointsPerSeconds, 3);

        transformedData.push(pointCol1);
        transformedData.push(pointCol2);
        transformedData.push(pointCol3);
        transformedData.push(pointCol4);
    };

    //order data by time before returning
    return transformedData.sort((a, b) => (a.time > b.time) ? 1 : -1);;
}

const getBuffer = (buffer)=>{
    const section1 = [
        buffer[0],
        buffer[1],
        buffer[2],
        buffer[3]
    ];
    const max1 = Math.max(...section1);

    const section2 = [
        buffer[4],
        buffer[5],
        buffer[6],
        buffer[7]
    ];    
    const max2 = Math.max(...section2);

    const section3 = [
        buffer[8],
        buffer[9],
        buffer[10],
        buffer[11]
    ];
    const max3 = Math.max(...section3);

    const section4 = [
        buffer[12],
        buffer[13],
        buffer[14],
        buffer[15]
    ];
    const max4 = Math.max(...section4);

    return [max1, max2, max3, max4]
}

const getBufferbk = (buffer, sectionsNumber = 4)=>{
    let count = 0;
  
    const sections = [...Array(sectionsNumber)].map(() => (
      [...Array(4)].map(() => {
        const buff = buffer[count];
        count += 1;
        return buff;
      })
    ));
  
    const maxs = sections.map((max) => Math.max(...max));
  
    return maxs;
  };

const getTopBufferFromColumn = (array, position)=>{
    const col = array.map(e=>{
        const buffer = e.buffer[position];
        return {
            ...e,
            buffer,
        }
    });
    
    let maxValue = {
        buffer: 0
    };

    col.forEach(e=>{ if(e.buffer >= maxValue.buffer) maxValue = e; });
    

    return {...maxValue, position};
}
