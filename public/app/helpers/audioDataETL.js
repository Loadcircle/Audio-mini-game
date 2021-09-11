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

const getBuffer = (buffer, sectionsNumber = 4)=>{
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
