//% color="#6495ED" iconWidth=50 iconHeight=40
namespace GestureTouchSensor {
    //% board="arduino"
    //% block="GestureTouchSensor init [SSR] pin RX [RX] TX [TX]" blockType="command"
    //% SSR.shadow="dropdown"   SSR.options="SSR"
    //% RX.shadow="dropdown"   RX.options="RX"
    //% TX.shadow="dropdown"   TX.options="TX" 

    export function GestureTouchSensorInitSSR(parameter: any, block: any) {
        let ssr = parameter.SSR.code;
        let tx = parameter.TX.code;
        let rx = parameter.RX.code;
        Generator.addInclude("GestureTouchSensorInitIncludeDFRobot_Gesture_Touch", "#include <DFRobot_Gesture_Touch.h>");
        Generator.addInclude("GestureTouchSensorInitIncludeSoftwareSerial", "#include <SoftwareSerial.h>");

        Generator.addObject(`GestureTouchSensorInitObjectSoftwareSerial${ssr}`,"SoftwareSerial", `${ssr}(${rx}, ${tx});`);
        Generator.addObject(`GestureTouchSensorInitObjectDFRobot_Gesture_Touch${ssr}`,"DFRobot_Gesture_Touch", `DFGT(&${ssr});`);
        Generator.addObject("GestureTouchSensorInitObjectDFRobot_Gesture_Touchrslt","int8_t", `GestureTouchSensorRead_rslt=0;`);

        Generator.addSetup(`GestureTouchSensorInitSetupmySerial${ssr}`,`${ssr}.begin(9600);`);
        Generator.addSetup("GestureTouchSensorInitSetupDFGT","DFGT.setGestureDistance(20);");
    }

    //% board="esp32","arduino"
    //% block="GestureTouchSensor init [SR] pin RX [SRX] TX [STX]" blockType="command"
    //% SR.shadow="dropdown"   SR.options="SR"
    //% SRX.shadow="dropdown"   SRX.options="SRX"
    //% STX.shadow="dropdown"   STX.options="STX" 

    export function GestureTouchSensorInitSR(parameter: any, block: any) {
        let sr = parameter.SR.code;
        let stx = parameter.STX.code;
        let srx = parameter.SRX.code;
        Generator.addInclude("GestureTouchSensorInitIncludeDFRobot_Gesture_Touch", "#include <DFRobot_Gesture_Touch.h>");
       
        Generator.addObject("GestureTouchSensorInitObjectDFRobot_Gesture_Touch","DFRobot_Gesture_Touch", `DFGT(&${sr});`);
        Generator.addObject("GestureTouchSensorInitObjectDFRobot_Gesture_Touchrslt","int8_t", `GestureTouchSensorRead_rslt=0;`);
        console.log("b:")
        console.log(Generator.board);

        if(Generator.board=="arduino"){
            Generator.addSetup(`GestureTouchSensorInitSetupmySerial${sr}`,`${sr}.begin(9600);`);
        }else if(Generator.board=="esp32"){
            Generator.addSetup(`GestureTouchSensorInitSetupmySerial${sr}`,`${sr}.begin(9600,${srx},${stx});`);
        }
        else if(Generator.board=="microbit"){
            Generator.addSetup(`GestureTouchSensorInitSetupmySerial${sr}`,`${sr}.begin(9600,${srx},${stx});`);
        }
            Generator.addSetup("GestureTouchSensorInitSetupDFGT", "DFGT.setGestureDistance(20);");
    
        }
   


    //% block="GestureTouchSensor read" blockType="command"

    export function GestureTouchSensorRead(parameter: any, block: any) {
        Generator.addCode("GestureTouchSensorRead_rslt=DFGT.getAnEvent();");
    }

//if(DFRobot_Gesture_Touchrslt=DFGT_EVT_BACK)


    //% block="GestureTouchSensor [RSLT]" blockType="boolean"
    //% RSLT.shadow="dropdown"   RSLT.options="RSLT"
    export function GestureTouchSensorRslt(parameter: any, block: any) {
        let rslt=parameter.RSLT.code;
        Generator.addCode([`GestureTouchSensorRead_rslt == ${rslt}`,Generator.ORDER_UNARY_POSTFIX]);
    }
    //% block="GestureTouchSensor set distence [DST]" blockType="command"
    //% DST.shadow="number"     DST.defl="10"
    export function GestureTouchSensoreSetDist(parameter: any, block: any) {
        let dis=parameter.DST.code;
        Generator.addSetup("GestureTouchSensorInitSetupDFGT",`DFGT.setGestureDistance(${dis});`,true);

     }

}
