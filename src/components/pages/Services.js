
import '../../App.css';

import React, { useState, useEffect, useRef } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import _ from "lodash";
import UploadService from "../Apicalls/upload-files.service";


import { Container, Row, Col } from 'react-grid-system';

const TABLE_LIST_1 = [{ x: 0, y: 0 }];
const TABLE_LIST_2 = [{ x2: 0, y2: 0 }];
const TABLE_LIST_3 = [{ x3: 0, y3: 0 }];
const TABLE_LIST_4 = [{ x4: 0, y4: 0 }];


export default function Chart() {
  const [list1, setlist1] = useState([...TABLE_LIST_1]);
  const [list2, setlist2] = useState([...TABLE_LIST_2]);
  const [list3, setlist3] = useState([...TABLE_LIST_3]);
  const [list4, setlist4] = useState([...TABLE_LIST_4]);
  const [sampling, setsampling] = useState(false);
  const [sampling2, setsampling1] = useState(false);
  const [sampling3, setsampling2] = useState(false);
  const [sampling4, setsampling3] = useState(false);

  function useInterval(callback, delay) {
   
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

 



  useInterval(() => {
   

   
    if (sampling) {
      UploadService.getFiles().then((response) =>{
      let result = _.cloneDeep(list1);
      let result2 = _.cloneDeep(list2);
      let result3 = _.cloneDeep(list3);
      let result4 = _.cloneDeep(list4);
      result.push({
        x: response.data.timestamp,
        y: response.data.demand
      });
      result2.push({
        x2: response.data.timestamp,
        y2: response.data.battery
      });
      result3.push({
        x3: response.data.timestamp,
        y3: response.data.pv
      });
      result4.push({
        x4: response.data.timestamp,
        y4: response.data.hourly_Grid_Price
      });
     
      console.log(result);
      setlist1(result);
      setlist2(result2);
      setlist3(result3);
      setlist4(result4);
    });}
  }, 5000); 

  const start = () => {
    let result = sampling;
    setsampling(!result);
    let result2 = sampling2;
    setsampling1(!result2);
    let result3 = sampling3;
    setsampling2(!result3);
    let result4 = sampling4;
    setsampling3(!result4);

    
  };

  return (
   
    
      <Container fluid>
      <Row debug>
        <Col xs={6} debug><ScatterChart
   width={600}
   height={400}
   margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
 >
   <CartesianGrid />
   <XAxis type="number" dataKey={"x"} />
   <YAxis type="number" dataKey={"y"} />
   <Tooltip cursor={{ strokeDasharray: "3 3" }} />
   <Legend />
   <Scatter
     name="demand"
     data={list1}
     fill="#8884d8"
     line
     shape="circle"
   />
 </ScatterChart>
 <button onClick={start}>
   {sampling ? "Stop receiving" : "Start receiving"}
   
 </button></Col>
        <Col xs={6} debug><ScatterChart
   width={600}
   height={400}
   margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
 >
   <CartesianGrid />
   <XAxis type="number" dataKey={"x2"} />
   <YAxis type="number" dataKey={"y2"} />
   <Tooltip cursor={{ strokeDasharray: "3 3" }} />
   <Legend />
   <Scatter
     name="battery"
     data={list2}
     fill="#8884d8"
     line
     shape="circle"
   />
 </ScatterChart>
 </Col>
        <Col xs={6} debug><ScatterChart
   width={600}
   height={400}
   margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
 >
   <CartesianGrid />
   <XAxis type="number" dataKey={"x3"} />
   <YAxis type="number" dataKey={"y3"} />
   <Tooltip cursor={{ strokeDasharray: "3 3" }} />
   <Legend />
   <Scatter
     name="pv"
     data={list3}
     fill="#8884d8"
     line
     shape="circle"
   />
 </ScatterChart>
</Col>
 <Col xs={6} debug><ScatterChart
   width={600}
   height={400}
   margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
 >
   <CartesianGrid />
   <XAxis type="number" dataKey={"x4"} />
   <YAxis type="number" dataKey={"y4"} />
   <Tooltip cursor={{ strokeDasharray: "3 3" }} />
   <Legend />
   <Scatter
     name="hourly_Grid_Price"
     data={list4}
     fill="#8884d8"
     line
     shape="circle"
   />
 </ScatterChart>
 </Col>
      </Row>
    </Container>






  );
}


