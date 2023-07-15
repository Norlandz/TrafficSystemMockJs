import * as React from 'react';
import axios from 'axios';
                                          
import { Client, StompSubscription } from '@stomp/stompjs';

import { plainToInstance } from 'class-transformer';
import moment from 'moment';

import { HihesNode } from './lib/node/HihesNode';
import { Vehicle } from './lib/traffic/Vehicle';
import { MapFile } from './lib/traffic/MapFile';
import { VehicleInfoTrafficDetectorDto } from './lib/traffic/VehicleInfoTrafficDetectorDto';
import { TrafficDetector } from './lib/traffic/TrafficDetector';
import { LocationGeneric } from './lib/traffic/LocationGeneric';

import { Toggler } from './lib/libNt/_useful/JsUtil_Nt.js';

import styles from './App.module.css';
import './lib/libNt/_general/basicCss_Nt.css';
import cssCp from './lib/libNt/_useful/cssClassAsPropAndToggle.module.css';
import cssPanel from './lib/libNt/panelHtse/panelHtse_general_Nt.module.css';
import { Point } from './lib/shape/Point';

               
               

                                     
             
                                 
                        
  
       
                                            
                                                                                                                                  
                                  
                             
       
                                            
                                                                                                                                  
                                  
                             
       
                                            
                                                                                                                                  
                                     
                             
       
                                            
                                                                                                                                  
                                         
                             

               
               

            
              
                      
                                 
        
             

                
const root = document.getElementById('root') as HTMLDivElement;
root.style.cssText = 'height: 100%;';                                    
                                                             

                                                                                

                           
                                             
  
                             
                                                     
  
     
                      
                                                
                    
                          
      
     
                                                                                                         
                                                                   
                                                                                                
const SearchContext = React.createContext({
  stateRt_arr_SearchedVehicle: new Array<Vehicle>(),
  setstateRt_arr_SearchedVehicle: (e: Vehicle[]) => {},                                       
});

               

const url_lh = 'http://localhost:8080';
const url_vu = '/v0.1/user';
const url = url_lh + url_vu;

const ws_to_connect = '/ws_to_connect';
const SOCKET_URL = 'ws://localhost:8080' + ws_to_connect;

const ws_BrokerTopic_ServerPubClientSub = '/topic';
const ws_BrokerTopic_ClientPubServerSub = '/app';
const ws_TopicFolder_cpss_AA = '/cpss_msg';
const ws_TopicFolder_spcs_AA = '/spcs_msg';
const ws_client_pub_folder_AA = ws_BrokerTopic_ClientPubServerSub + ws_TopicFolder_cpss_AA;
const ws_client_sub_folder_AA = ws_BrokerTopic_ServerPubClientSub + ws_TopicFolder_spcs_AA;
const url_http_endpoint_delegate_to_ws = url_lh + '/http_endpoint_delegate_to_ws';

const topic_PosOfVehicle = '/topic_PosOfVehicle';
const topic_VehicleInfoTrafficDetectorDto = '/topic_VehicleInfoTrafficDetectorDto';
const wsSub_PosOfVehicle = ws_BrokerTopic_ServerPubClientSub + topic_PosOfVehicle;
const wsSub_VehicleInfoTrafficDetectorDto = ws_BrokerTopic_ServerPubClientSub + topic_VehicleInfoTrafficDetectorDto;

let subscription_PosOfVehicle: StompSubscription | null = null;
let subscription_VehicleInfoTrafficDetectorDto: StompSubscription | null = null;

const ws_ClientOption = {
  brokerURL: SOCKET_URL,
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
                            
                                  
};

const client_MsgWsTest = new Client(ws_ClientOption);
const client_PosOfVehicle = new Client(ws_ClientOption);
const client_VehicleInfoTrafficDetectorDto = new Client(ws_ClientOption);

function App() {
        
  const [count, setCount] = React.useState(0);

        
  const [sceneMainContent, setStateRt_sceneMainContent] = React.useState(SceneMainContent.Home);

        
  const [stateRt_arrVehicle, setStateRt_arrVehicle] = React.useState(new Array<Vehicle>());

  const get_arrVehicle = React.useCallback(async () => {
    console.log('>> get_arrVehicle() useCallback');
    try {
      const methodLinkName = 'getGpVehicleInVehicleInventory';
      const result = await axios.get(url + '/' + methodLinkName);
      console.log(result.data);
                                                                                         
                                                                                                       
                                                               
                                           
      const arrVehicle = plainToInstance(Vehicle, result.data);
                      
      if (arrVehicle === null || arrVehicle === undefined) { throw new TypeError(); }                   
      setStateRt_arrVehicle(arrVehicle);
    } catch (err) {
      throw new Error('' + err);
    }
  }, []);

  React.useEffect(() => {
                                                        
    get_arrVehicle();
  }, []);

        

  const [stateRt_arr_SearchedVehicle, setstateRt_arr_SearchedVehicle] = React.useState(new Array<Vehicle>());
  const useSt = { stateRt_arr_SearchedVehicle, setstateRt_arr_SearchedVehicle };
                                                                                                             

                          
                                                                                                                                               
                 
                                                                                      
                                                           
                       
                 
                                           
                                                                                                                          
                                                 
                                                   
                                                                           
                                         
                                                                
                                                   
                                                                                   
                             
                           
                           
                        
                 
                                                    
                                                      
                        
                 
                                                 
                                              
                                             
                                                
                                                
                                               
                                                     
                         
                 
                                        
                           
                 
                                                                   
                                                    
                                                                                                                     
                                                                                               
                                  
                                          
                            
                            
                                                      
                                                      
                         
                                       
                          
                         
                                    
                                                               
                            
                         
                        
                     

        
                                                                                                                                                                                                                
                                                                        
                                                                                                                                        
                                                                                               
                                                                                                                                                                                                                 

  const [stateRt_msgWsTest, setStateRt_msgWsTest] = React.useState('msgWsTest placeholder');

  React.useEffect(() => {
                                                                                                        
    client_MsgWsTest.onConnect = () => {
      console.log('Connected -- client_MsgWsTest');
      client_MsgWsTest.subscribe(ws_client_sub_folder_AA, function (msg) {
        if (!msg.body) {
          throw new Error();
        }
        const jsonBody = JSON.parse(msg.body);
        if (!jsonBody.message) {
          throw new Error();
        }
        setStateRt_msgWsTest(jsonBody.message);
      });
    };

    client_MsgWsTest.onDisconnect = () => {
      console.log('Disconnected!!');
    };

    client_MsgWsTest.activate();
  }, []);

  async function rpc_sendMsgWsTest_http(msg: string) {
                                                                                                   
    const result = await axios.post(
      url_http_endpoint_delegate_to_ws,
      {
        message: msg,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
  }

                                                                                                                                                                                                                                                                                                                                                                                           
  function rpc_sendMsgWsTest_ws(msg: string) {
    client_MsgWsTest.publish({
      destination: ws_client_pub_folder_AA,
      body: JSON.stringify({
        message: msg,
      }),
    });
  }

        

  return (
    <>
      <div style={{ position: 'absolute', left: 0, bottom: -50, zIndex: 50 }}>
        <div>
          <button className={cssPanel.buttonNt} onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <div>
          <button className={cssPanel.buttonNt} onClick={() => rpc_sendMsgWsTest_http('client send msgWsTest (& get back)')}>
            {rpc_sendMsgWsTest_http.name}
          </button>
          <button className={cssPanel.buttonNt} onClick={() => rpc_sendMsgWsTest_ws('client send msgWsTest')}>
            {rpc_sendMsgWsTest_ws.name}
          </button>
          <span>{stateRt_msgWsTest}</span>
        </div>
      </div>

      <div className={styles.wholeBodyPanel}>
        <NavigationPanel setStateRt_sceneMainContent={setStateRt_sceneMainContent} />
        <SearchContext.Provider value={useSt}>
          <MainContent sceneMainContent={sceneMainContent} stateRt_arrVehicle={stateRt_arrVehicle} get_arrVehicle={get_arrVehicle} />
          <SearchPanel stateRt_arrVehicle={stateRt_arrVehicle} />
        </SearchContext.Provider>
      </div>
    </>
  );
}

               
               

type NavigationPanelProps = {
  setStateRt_sceneMainContent: React.Dispatch<React.SetStateAction<SceneMainContent>>;
};

const NavigationPanel: React.FC<NavigationPanelProps> = ({ setStateRt_sceneMainContent }) => {
         
  const hihesNode_root = new HihesNode('root');
  let hihesNode;
  let hihesNode_LvNext;
  hihesNode = new HihesNode('Home');
  hihesNode.onClick = (event) => setStateRt_sceneMainContent(SceneMainContent.Home);
  hihesNode_root.appendNode(hihesNode);
  hihesNode = new HihesNode('Map');
  hihesNode.onClick = (event) => setStateRt_sceneMainContent(SceneMainContent.Map);
  hihesNode_root.appendNode(hihesNode);
  hihesNode_LvNext = new HihesNode('Demo01');
  hihesNode.appendNode(hihesNode_LvNext);
  hihesNode = new HihesNode('Vehicle');
  hihesNode.onClick = (event) => setStateRt_sceneMainContent(SceneMainContent.Vehicle);
  hihesNode_root.appendNode(hihesNode);

                                                            

  const [hideShow, setHideShow] = React.useState(false);
  const hideShowTog = React.useCallback(Toggler.init(function (this: Toggler) { setHideShow(this.toggle); }), []);                   
                            
                            
                                                                    
                                                  

  return (
    <div className={styles.leftNavigationPanelGrand}>
      <button className={cssPanel.buttonNt} style={{ position: 'absolute', zIndex: 30, bottom: 50 }} onClick={(event) => hideShowTog()}>
        Hide
      </button>
      <div className={styles.leftNavigationPanel + (hideShow ? ' ' + cssCp['cp₰display⡅none'] : '')}>
        <NavButton hihesNode={hihesNode_root} />
      </div>
    </div>
  );
};

       

type NavButtonProps = {
  hihesNode: HihesNode;
};

                                                              
                                                        
const NavButton: React.FC<NavButtonProps> = ({ hihesNode }) => (
  <ul>
    {hihesNode.arr_hihesNode_child.map((e) => (
      <li key={e.seqNum}>
        <button className={cssPanel.buttonNt} onClick={e.onClick}>
          {e.name}
        </button>
        <NavButton hihesNode={e} />
      </li>
    ))}
  </ul>
);

               
               

enum SceneMainContent {
  Home,
                                           
  Map,
  Vehicle,
}

type MainContentProps = {
  sceneMainContent: SceneMainContent;
  stateRt_arrVehicle: Vehicle[];
  get_arrVehicle: Function;
};

                                                                                                                  
const MainContent: React.FC<MainContentProps> = React.memo(({ sceneMainContent, stateRt_arrVehicle, get_arrVehicle }) => {
  console.log('>> MainContent');

                                              
                                                          
                   
               
                                    
                   
                                  
                                               
                                      
                                                   
                          
                    
                
             
                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                     
                                  
                                                                    
                                                                                                           
          
         
    
                                                                                         

    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                              

             
                                                
                                                        
             
                                  
                 
                                
                                             
                                    
                                                 
                        
                  
              
                  
                                                                             
                                                                                                                                                          
             
       
  return (
    <div className={styles.mainContentPanel}>
      <div style={sceneMainContent === SceneMainContent.Home ? undefined : { display: 'none' }}>
        <h1>Instructions</h1>
        <ul>
          <li>goto Map</li>
          <li>click createMapDemo01</li>
          <li>goto Vehicle</li>
          <li>click createVehicleDemo01</li>
          <li></li>
        </ul>
      </div>
      <div style={sceneMainContent === SceneMainContent.Map ? undefined : { display: 'none' }}>
        <MapCombined />
      </div>
      <div style={sceneMainContent === SceneMainContent.Vehicle ? undefined : { display: 'none' }}>
        <VehicleScene stateRt_arrVehicle={stateRt_arrVehicle} get_arrVehicle={get_arrVehicle} />
      </div>
    </div>
  );
});

               

                                                                                                      
                                        
const MapCombined: React.FC = React.memo(() => {
  console.log('>> MapCombined');

                                                                   
                                                       
  const [scene, setStateRt_scene] = React.useState(Nav_Map_C.Overview);

  return (
    <div className={styles.mapCombinedPanel}>
      <div className={styles.topCombinedNavigationPanel}>
        <button className={cssPanel.buttonNt} onClick={(event) => setStateRt_scene(Nav_Map_C.Overview)}>
          Overview
        </button>
        <button className={cssPanel.buttonNt} onClick={(event) => setStateRt_scene(Nav_Map_C.Map)}>
          Map
        </button>
        <button className={cssPanel.buttonNt} onClick={(event) => setStateRt_scene(Nav_Map_C.Detector)}>
          Detector
        </button>
        <button className={cssPanel.buttonNt} onClick={(event) => setStateRt_scene(Nav_Map_C.Vehicle)}>
          Vehicle
        </button>
      </div>
      <MapOverviewCombined scene={scene} />
    </div>
  );
});
               

enum Nav_Map_C {
  Overview,
  Map,
  Detector,
  Vehicle,
}

                                    
                      
     

const timeGap_EachGetMapImg = 500;

                                                                               
const MapOverviewCombined: React.FC<{ scene: Nav_Map_C }> = React.memo(({ scene }) => {
  console.log('>> MapOverviewCombined');

               
  const [stateRt_mapImg, setStateRt_mapImg] = React.useState('');

                                 
  const getMapImg = React.useCallback(async () => {
    console.log('>> getMapImg() -- //think performance & useCallback');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    const mapImgStr = await rpc_getMapImg();
    setStateRt_mapImg(mapImgStr);
  }, []);

                                                                             
                                                              
                                  
                 
                            
                   
            
       
                                                                                                                                                                                            
       
                                                                                                                        
  React.useEffect(() => {
    let sn_retry = 0;
    const id_interval = setInterval(async () => {
      if (sn_retry === 10) {
                                                      
        clearInterval(id_interval);
        console.error('No more retry to getMapImg() @TP use subscribe later better');
      }
                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                 
      try {
        await getMapImg();
      } catch (error) {
        sn_retry++;
        console.error(error + ' sn_retry:' + sn_retry);
      }
                                       
                                
           
    }, timeGap_EachGetMapImg);

    return () => {
      clearInterval(id_interval);
    };
  }, []);
                                                                                                       

                          

  React.useEffect(() => {
    (async () => {
      const gpTrafficDetector = await rpc__getGpTrafficDetector();
      console.log(gpTrafficDetector);
      setStateRt_gpTrafficDetector(gpTrafficDetector);
    })();                 
  }, []);

                 

                                                    
  const [stateRt_gpTrafficDetector, setStateRt_gpTrafficDetector] = React.useState<Set<TrafficDetector>>(new Set());

                
  const [stateRt_mppVehicleInMap, setStateRt_mppVehicleInMap] = React.useState<Map<number, Vehicle>>(new Map());

        

  React.useEffect(() => {
    client_VehicleInfoTrafficDetectorDto.onConnect = () => {
      console.log('Connected -- client_VehicleInfoTrafficDetectorDto');
      if (subscription_VehicleInfoTrafficDetectorDto !== null) {
        subscription_VehicleInfoTrafficDetectorDto.unsubscribe();
      }
      subscription_VehicleInfoTrafficDetectorDto = client_VehicleInfoTrafficDetectorDto.subscribe(wsSub_VehicleInfoTrafficDetectorDto, function (msg) {
                              
        if (!msg.body) {
          throw new Error();
        }
        const jsonBody = JSON.parse(msg.body);
                                                                                                          
                                                                                                               
                      
                                                                  
        const gpTrafficDetector = plainToInstance(TrafficDetector, jsonBody);
        console.log(gpTrafficDetector);
        setStateRt_gpTrafficDetector(new Set(gpTrafficDetector));                                        
      });
    };

    client_VehicleInfoTrafficDetectorDto.onDisconnect = () => {
      console.log('Disconnected!!');
    };

    client_VehicleInfoTrafficDetectorDto.activate();
  }, []);

  const switchScene = () => {
    if (scene === Nav_Map_C.Overview) {
      return <OverviewContent stateRt_mapImg={stateRt_mapImg} stateRt_gpTrafficDetector={stateRt_gpTrafficDetector} stateRt_mppVehicleInMap={stateRt_mppVehicleInMap} setStateRt_mppVehicleInMap={setStateRt_mppVehicleInMap} getMapImg={getMapImg} />;
    } else if (scene === Nav_Map_C.Map) {
      return <MapContent stateRt_mapImg={stateRt_mapImg} setStateRt_gpTrafficDetector={setStateRt_gpTrafficDetector} setStateRt_mppVehicleInMap={setStateRt_mppVehicleInMap} getMapImg={getMapImg} />;
    } else if (scene === Nav_Map_C.Detector) {
      return (
        <>
          <h1>Detector</h1>
          {                      }
          <TableTrafficDetector list={Array.from(stateRt_gpTrafficDetector)} />
        </>
      );
    } else if (scene === Nav_Map_C.Vehicle) {
      return (
        <>
          <h1>Vehicle</h1>
          {                                                                                                                                                                                                                                                          
                                                                                                                                                                                          }
        </>
      );
    }
  };

  return <>{switchScene()}</>;
});

               

                                                 
async function rpc_placeVehicleInMap(idSql: number) {
  const methodLinkName = 'placeVehicleInMap';
  const result = await axios.post(url + '/' + methodLinkName, null, {
    params: {
      idSqlOfVehicle: idSql,
              
              
    },
  });
}

                                                                                      
async function rpc_setPosSelfOfVehicleInMap(idSql: number, posSelf: Point) {
  console.log('>> setPosSelfOfVehicleInMap' + ' :: ' + idSql);
  const methodLinkName = 'setPosSelfOfVehicleInMap';
  const result = await axios.post(url + '/' + methodLinkName, null, {
    params: {
      idSqlOfVehicle: idSql,
      x: posSelf.x,
      y: posSelf.y,
    },
  });
}

async function rpc_gotoTarget(idSql: number, posGoto: Point) {
  console.log('>> gotoTarget' + ' :: ' + idSql);
  const methodLinkName = 'gotoTarget';
  const result = await axios.post(url + '/' + methodLinkName, null, {
    params: {
      idSqlOfVehicle: idSql,
      x: posGoto.x,
      y: posGoto.y,
    },
  });
}

      

type OverviewContentProps = {
  stateRt_mapImg: string;
  stateRt_gpTrafficDetector: Set<TrafficDetector>;
  stateRt_mppVehicleInMap: Map<number, Vehicle>;
  setStateRt_mppVehicleInMap: React.Dispatch<React.SetStateAction<Map<number, Vehicle>>>;
  getMapImg: () => any;
};

                                                                                                                                                   
const OverviewContent: React.FC<OverviewContentProps> = React.memo(({ stateRt_mapImg, stateRt_gpTrafficDetector, stateRt_mppVehicleInMap, setStateRt_mppVehicleInMap, getMapImg }) => {
  console.log('>> OverviewContent render');

        

                                                                                                                                                                                                                                                                                                                                                                                                                            

                                                                                
                                                                                                                                 
                                                               
                            
                   
                     
                                         
                                                                                                                                                     
                                                                
                                       
                                                                          
                            
                   
            
                                                      

        

                                                                                        
                                                                                        
    
                                                             
                                                                                         
                                                                                                                                                                                                                                             
                                                                                       
                                     
                                                                       
                                                                                              
                                     
                                                                       
          
        
    
                                    
                                    

                              
  const [stateRt_posSelf, setStateRt_posSelf] = React.useState<Point | null>(null);
  const [stateRt_posGoto, setStateRt_posGoto] = React.useState<Point | null>(null);

  const [stateRt_selectedVehicle, setStateRt_selectedVehicle] = React.useState<Vehicle | null>(null);

  function setPosSelfOrGoto(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const elt = refRt_mapImg.current;
    if (elt === null) {
      console.log('>> refRt_mapImg.current is Null');
      return;
    }
                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                                                                                          
                                                                                                          
                                              
    const posX_Hard = event.clientX - elt.x;
    const posY_Hard = event.clientY - elt.y;
    const ratio = elt.offsetWidth / elt.naturalWidth;
    const posX_Real = posX_Hard / ratio;
    const posY_Real = posY_Hard / ratio;

    console.log('>> setPosSelfOrGoto' + ' :: ' + `${posX_Real}, ${posY_Real}` + ' :: ' + `${event.clientX}, ${event.clientY}` + ' :: ' + event.ctrlKey + ' ' + event.altKey + ' ' + event.shiftKey + ' ' + event.button);

    if (event.ctrlKey && !event.altKey && !event.shiftKey && event.button === 0) {
      const pt = new Point(posX_Real, posY_Real);
      setStateRt_posSelf(pt);
      if (stateRt_selectedVehicle !== null) {
                                               
                                                                         
        stateRt_selectedVehicle.posSelf = pt;
      }
    } else if (event.ctrlKey && !event.altKey && !event.shiftKey && event.button === 2) {
      const pt = new Point(posX_Real, posY_Real);
      setStateRt_posGoto(pt);
      if (stateRt_selectedVehicle !== null) {
        stateRt_selectedVehicle.posGoto = pt;
      }
    }
  }

        

  const { stateRt_arr_SearchedVehicle, setstateRt_arr_SearchedVehicle } = React.useContext(SearchContext);

        
  const refRt_mapImg = React.useRef<HTMLImageElement>(null);

        

  return (
    <div className={styles.mapOverviewPanel}>
      <div className={styles.overviewMapPanel}>
        <h1>Map</h1>
        <img onMouseUp={setPosSelfOrGoto} ref={refRt_mapImg} alt="" src={stateRt_mapImg === '' ? '' : 'data:image/png;base64,' + stateRt_mapImg}></img>
      </div>
      <div className={styles.overviewDetectorPanel}>
        <h1>Detector</h1>
        <TableTrafficDetector list={Array.from(stateRt_gpTrafficDetector)} />
      </div>
      <div className={styles.overviewVehiclePanel}>
        <h1>Vehicle</h1>
        {                                                                                                                                                   }
        <TableVehicleInMap list={Array.from(stateRt_mppVehicleInMap.values())} stateRt_selectedVehicle={stateRt_selectedVehicle} setStateRt_selectedVehicle={setStateRt_selectedVehicle} stateRt_posSelf={stateRt_posSelf} stateRt_posGoto={stateRt_posGoto} />
        <TableSearchedVehicleAddToMap list={stateRt_arr_SearchedVehicle} stateRt_mppVehicleInMap={stateRt_mppVehicleInMap} setStateRt_mppVehicleInMap={setStateRt_mppVehicleInMap} />
      </div>
    </div>
  );
});

     

                                                                                      
const TableTrafficDetector: React.FC<{ list: TrafficDetector[] }> = React.memo(({ list }) => {
                                                                                              
  console.log('>> TableTrafficDetector Convert ');
                       
  return (
    <table>
      <thead>
        <tr>
          <th>{'idBsi'}</th>
          {                                              }
          <th>{'pointLocation'}</th>
          <th>{'radiusDetection'}</th>
          <th>{'arrVehicleInfoTrafficDetectorDtoHistory'}</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.idBsi}>
            <td>{item.idBsi}</td>
            {                                                               }
            <td>{item.pointLocation.toString()}</td>
            <td>{item.radiusDetection}</td>
            {                                                             }
            <td>
              <TableVehicleInfoTrafficDetectorDto list={item.arrVehicleInfoTrafficDetectorDtoHistory} />
            </td>
          </tr>
        ))}
      </tbody>
      {                                       }
    </table>
  );
});

const TableVehicleInfoTrafficDetectorDto: React.FC<{ list: VehicleInfoTrafficDetectorDto[] }> = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>{'detectionCreationTime'}</th>
          {                                               }
          <th>{'idBsiOfDetection'}</th>
          <th>{'idBsiOfVehicle'}</th>
          {                                      }
          <th>{'vehicleNum'}</th>
          <th>{'posMeasuredByTrafficDetector'}</th>
          <th>{'speedMeasuredByTrafficDetector'}</th>
          <th>{'locationDestination'}</th>
          <th>{'locationOriginate'}</th>
          <th>{'vehicleType'}</th>
          <th>{'brandVehicle'}</th>
        </tr>
      </thead>
      <tbody>
        {
                                  
          list.map((item) => (
            <tr key={item.idSql}>
              <td>{item.detectionCreationTime.toISOString()}</td>
              {                                                                }
              <td>{item.idBsiOfDetection}</td>
              <td>{item.idBsiOfVehicle}</td>
              {                                                        }
              <td>{item.vehicleNum}</td>
              <td>{item.posMeasuredByTrafficDetector.toString()}</td>
              <td>{item.speedMeasuredByTrafficDetector}</td>
              <td>{item.locationDestination?.toString()}</td>
              <td>{item.locationOriginate?.toString()}</td>
              <td>{item.vehicleType}</td>
              <td>{item.brandVehicle}</td>
            </tr>
          ))
        }
      </tbody>
      {                                       }
    </table>
  );
};

                                      
                     
                                   
                                   
                                                         
const TableVehicleInMap: React.FC<{
  list: Vehicle[];
  stateRt_posSelf: Point | null;
  stateRt_posGoto: Point | null;
  stateRt_selectedVehicle: Vehicle | null;
  setStateRt_selectedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
}> = ({ list, stateRt_posSelf, stateRt_posGoto, stateRt_selectedVehicle, setStateRt_selectedVehicle }) => {
  console.log('>> TableVehicleInMap');

                                                                                                       

                                                                                                                
                     
                                                         
                                               
                                                                 
                                                                            
                                                                                              
                                                                                     
                                              
                                                  
                               
                                                                    
                                                                                                       
                                                 
                                                                
                                                                           
                                                                             
                                               
                                        
                                 
                               
                                           
                                                                            
                               
                                                                            
                               
                            
                     
                                                                    
                                                          
                            
                     
                                                         
                               
                                                                                
                                                                                                             
               
                                                       
         
       
                                                                                                            

  const [stateRt_Refresh, setStateRt_Refresh] = React.useState(moment().format('ss.SSS'));

                                   
                                                                       
                              
  function wsClient_subscribe() {
    const headerId = 'headerId_client_PosOfVehicle';
                                                                                                                    
                                                      
    if (subscription_PosOfVehicle !== null) {
      subscription_PosOfVehicle.unsubscribe();
                                                          
    }
    subscription_PosOfVehicle = client_PosOfVehicle.subscribe(
      wsSub_PosOfVehicle,
      function (msg) {
        console.log('>> client_PosOfVehicle');
                                                                                             
                                                                                                         
                                                                          
        if (!msg.body) {
          throw new Error();
        }
        const jsonBody = JSON.parse(msg.body);
        const vehicle = plainToInstance(Vehicle, jsonBody as { length?: never });
        let found = false;
        for (const vehicle_curr of list) {
          if (vehicle_curr.idSql === vehicle.idSql) {
                                                                                                                                
            vehicle_curr.posActual = vehicle.posActual;
            found = true;
            break;
          }
        }
        if (!found) {
                                                         
          console.error(`Must found :: ${vehicle.idSql} -- must inside (the list) in the MapFile || (unless this is debuging in Java, so Js doesnt have that list)`);
          console.log(list.length);
        }
        setStateRt_Refresh(moment().format('ss.SSS'));
      },
      {
        id: headerId,
      }
    );
  }

  React.useEffect(() => {
    client_PosOfVehicle.onConnect = () => {
      console.log('Connected -- client_PosOfVehicle');
      wsClient_subscribe();
    };

    client_PosOfVehicle.onDisconnect = () => {
      console.log('Disconnected!!');
    };

    client_PosOfVehicle.activate();
  }, []);

  React.useEffect(() => {
                                                             
    if (client_PosOfVehicle.connected) {
                                                   
                                                                      
      wsClient_subscribe();
    }
  }, [list]);
                                                                                        

  return (
    <>
      <span>{`point: ${stateRt_posSelf} & ${stateRt_posGoto} - ${stateRt_Refresh}`}</span>
      <table>
        <thead>
          <tr>
            <th>{'vehicleNum'}</th>
            <th>{'vehicleType'}</th>
            <th>{'brandVehicle'}</th>
            <th>{'posSelfSetTo'}</th>
            <th>{'posGoto'}</th>
            <th>{'posSelfCurr'}</th>
            {                                                }
            <th>{'setStateRt_selectedVehicle'}</th>
            <th>{}</th>
            <th>{}</th>
          </tr>
        </thead>
        <tbody>
          {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                  
                                                           

            list.map((item) => {
              return (
                <tr key={item.idBsi} style={item === stateRt_selectedVehicle ? { border: '2px solid limegreen' } : undefined}>
                  <td>{item.vehicleNum}</td>
                  <td>{item.vehicleType}</td>
                  <td>{item.brandVehicle}</td>
                  <td>{item.posSelf?.toString()}</td>
                  <td>{item.posGoto?.toString()}</td>
                  <td>{item.posActual?.toString()}</td>
                  {       
                                                         
                          }
                  <td>
                    <button onClick={() => setStateRt_selectedVehicle(item)}>setStateRt_selectedVehicle</button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (item.posSelf === null) {
                          console.error('Null');
                          return;
                        }
                        rpc_setPosSelfOfVehicleInMap(item.idSql, item.posSelf);
                      }}
                    >
                      {rpc_setPosSelfOfVehicleInMap.name}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (item.posGoto === null) {
                          console.error('Null');
                          return;
                        }
                        rpc_gotoTarget(item.idSql, item.posGoto);
                      }}
                    >
                      {rpc_gotoTarget.name}
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
        {                                       }
      </table>
    </>
  );
};

const TableSearchedVehicleAddToMap: React.FC<{ list: Vehicle[]; stateRt_mppVehicleInMap: Map<number, Vehicle>; setStateRt_mppVehicleInMap: React.Dispatch<React.SetStateAction<Map<number, Vehicle>>> }> = ({ list, stateRt_mppVehicleInMap, setStateRt_mppVehicleInMap }) => {
                                    

  return (
    <table>
      <thead>
        <tr>
          <th>{'idBsi'}</th>
          <th>{'vehicleNum'}</th>
          <th>{'vehicleType'}</th>
          <th>{'brandVehicle'}</th>
          <th>{}</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.idBsi}>
            <td>{item.idBsi}</td>
            <td>{item.vehicleNum}</td>
            <td>{item.vehicleType}</td>
            <td>{item.brandVehicle}</td>
            <td>
              <button
                onClick={async () => {
                                                                           
                                             
                                                                   
                  await rpc_placeVehicleInMap(item.idSql);
                                                                                                                          
                  const updatedMap = new Map(stateRt_mppVehicleInMap);
                  updatedMap.set(item.idSql, item);
                  setStateRt_mppVehicleInMap(updatedMap);
                }}
              >
                {rpc_placeVehicleInMap.name}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <caption>TableSearchedVehicleAddToMap</caption>
    </table>
  );
};

               

async function rpc_createMapDemo01() {
  console.log('>> rpc_createMapDemo01()');
          
  const methodLinkName = 'createMapDemo01';
  const result = await axios.post(url + '/' + methodLinkName);
                    
                                    
                          
      
}
async function rpc_createMapDemo02() {
  console.log('>> rpc_createMapDemo02()');
  const methodLinkName = 'createMapDemo02';
  const result = await axios.post(url + '/' + methodLinkName);
  const mapFile = plainToInstance(MapFile, result.data as { length?: never });
  return mapFile;
}
async function rpc_newMapFile() {
  const methodLinkName = 'newMapFile';
  const result = await axios.post(url + '/' + methodLinkName);
}
async function rpc_loadMapFile(idSql: number): Promise<MapFile | null | undefined> {
  console.log('>> rpc_loadMapFile()');

  try {
    const methodLinkName = 'loadMapFile';
    const result = await axios.post(url + '/' + methodLinkName, null, {
      params: {
        idSql: idSql,
      },
    });                       
                                                              
                                                    

                                                        

                                                                                                                 
    const mapFile = plainToInstance(MapFile, result.data as { length?: never });                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                 
                                               
                                 
                                                                                                                         
         
                                        
                                             
                                                                                                                
                                                 
      
                                               
      
                             
                                                                          
                                 
                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                      
                                                       
                                                                                                       
                           
                              
                       
                                            
                                                                           
         
                          
                                                                                                                  
                                 
    return mapFile;
  } catch (error) {
                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    if (typeof error === 'string') {
      throw new Error(error);
    } else if (error instanceof Error) {
                       
      if (axios.isAxiosError(error)) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

                                                                                                                               
                                                                                                  
        if (error.response && error.response.status === 404 && error.response.data === null) {
                                                                              
          return error.response.data as null;
        } else {
                                       
          throw error;
        }
      } else {
        throw error;
      }
    }
  }
}
async function rpc_saveMapFile() {
                                                                                  
  const methodLinkName = 'saveMapFile';
  const result = await axios.post(url + '/' + methodLinkName);
  const mapFile = plainToInstance(MapFile, result.data as { length?: never });
  return mapFile;
}
async function rpc_removeMapFile(idSql: number) {
  const methodLinkName = 'removeMapFile';
  const result = await axios.post(url + '/' + methodLinkName, null, {
    params: {
      idSql: idSql,
    },
  });
  return result.data;
}
async function rpc__querySomeTable_MapFile_helper() {
  const methodLinkName = 'querySomeTable_MapFile_helper';
  const result = await axios.get(url + '/' + methodLinkName);
  return result.data;
}

      

async function rpc_getMapImg() {
  const methodLinkName = 'getMapImg';
  const result = await axios.get(url + '/' + methodLinkName);
  return result.data as string;
}

async function rpc__getGpTrafficDetector() {
  console.log('>> rpc__getGpTrafficDetector() useCallback');
  const methodLinkName = 'getGpTrafficDetector';
  const result = await axios.get(url + '/' + methodLinkName);
  const arr_TrafficDetector = plainToInstance(TrafficDetector, result.data);                                               
  return new Set(arr_TrafficDetector);
}

           

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

type MapContentProps = {
  stateRt_mapImg: string;
  getMapImg: () => any;

  setStateRt_gpTrafficDetector: React.Dispatch<React.SetStateAction<Set<TrafficDetector>>>;
  setStateRt_mppVehicleInMap: React.Dispatch<React.SetStateAction<Map<number, Vehicle>>>;
};

                                                                        
                                                                                                            
                                                                                       
                                                                                 
                                             
                                 
                                    
const MapContent: React.FC<MapContentProps> = ({ stateRt_mapImg, setStateRt_gpTrafficDetector, setStateRt_mppVehicleInMap, getMapImg }) => {
                                                
                            
                                                                                  

  async function rpcc_loadMapFile_Combined(idSql: number) {
    console.log('>> async function rpcc_loadMapFile_Combined(idSql: number) {');

    const mapFile = await rpc_loadMapFile(idSql);
    if (!mapFile) {
      throw new TypeError();
    }

    setStateRt_gpTrafficDetector(mapFile.gpTrafficDetector);
                                                 
                                                                                       
    return mapFile;
  }

                                                                                                        
                                                         
  async function rpcc_saveMapFile_Combined() {
    const mapFile = await rpc_saveMapFile();
    setStateRt_gpTrafficDetector(mapFile.gpTrafficDetector);
                                                                                       
    return mapFile;
  }
  async function rpcc_createMapDemo02() {
    const mapFile = await rpc_createMapDemo02();
    setStateRt_gpTrafficDetector(mapFile.gpTrafficDetector);
                                                                                       
    return mapFile;
  }

  return (
    <div className={styles.mapContentPanel}>
      <img alt="" src={stateRt_mapImg === '' ? '' : 'data:image/png;base64,' + stateRt_mapImg}></img>
      <div>^^ img of a map</div>
      <ul>
        <li>
          <button
            className={cssPanel.buttonNt}
            onClick={async (event) => {
              await rpc_createMapDemo01();
              getMapImg();
            }}
          >
            {rpc_createMapDemo01.name}
          </button>
        </li>
        <li>
          <button
            className={cssPanel.buttonNt}
            onClick={async (event) => {
              await rpcc_createMapDemo02();
              getMapImg();
            }}
          >
            {rpcc_createMapDemo02.name}
          </button>
        </li>
        <li>
          {                                                                               
                                 
                      }
          <ButtonSubmit exec_onSubmit={rpc_newMapFile} inputOutputDisplay={InputOutputDisplay.None} exec_afterSubmitRespond={getMapImg} />
        </li>
        <li>
          {                                                                                
                                  
                      }
          {                                    
                                            
                                   
                                                 
                    }
          {                                                                                                                                                }
          <ButtonSubmit exec_onSubmit={rpcc_loadMapFile_Combined} inputOutputDisplay={InputOutputDisplay.Input1Output1} exec_afterSubmitRespond={getMapImg} />
        </li>
        <li>
          {                                                                                
                                  
                      }
          {                                                                                                      }
          <ButtonSubmit exec_onSubmit={rpcc_saveMapFile_Combined} inputOutputDisplay={InputOutputDisplay.Output1} />
        </li>
        <li>
          <ButtonSubmit exec_onSubmit={rpc_removeMapFile} inputOutputDisplay={InputOutputDisplay.Input1Output1} />
        </li>
        <li>
          <button className={cssPanel.buttonNt} onClick={(event) => getMapImg()}>
            {                      }
            getMapImg
          </button>
        </li>
        {                               }
        <li>
          <ButtonSubmit exec_onSubmit={rpc__querySomeTable_MapFile_helper} inputOutputDisplay={InputOutputDisplay.Output1} />
        </li>
      </ul>
    </div>
  );
};

       

enum InputOutputDisplay {
  Input1,
  Output1,
  Input1Output1,
  None,
}

type ButtonSubmitProps = {
  exec_onSubmit: Function;
  inputOutputDisplay: InputOutputDisplay;
  exec_afterSubmitRespond?: () => any;
};
                                  
                                 
                                            
     

type OutputAndTime = {
  stateRt_output: string | null;
  stateRt_timeOutput: string | null;
};

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ exec_onSubmit, inputOutputDisplay, exec_afterSubmitRespond }) => {
                                                                                          
                                                                                                                                 
                                                                                                 
                                                                                                             
                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                
                                       

  console.log('>> ButtonSubmit');

  const [stateRt_input, setStateRt_input] = React.useState<number | null>(null);
                                                                                     
                                                                                             

                                                                                                   
  const setStateReducerRt_output = (state: OutputAndTime, action: string): OutputAndTime => {
    return {
                  
                                               
      stateRt_output: action,
      stateRt_timeOutput: moment().format('HH:mm:ss.SSS'),
    };
  };
  const [stateReducerRt_output, dispatchStateReducerRt_output] = React.useReducer(setStateReducerRt_output, { stateRt_output: null, stateRt_timeOutput: null });

                                                     
                                                   
                                
                                                                             
                                     
                              
        
    
                                                                                     
                                 
                                           
                              
                                                                                                
    
                                                
  if (exec_afterSubmitRespond !== undefined) {
    React.useEffect(() => {
      if (stateReducerRt_output.stateRt_output !== null) {
        console.log('>> useEffect() stateReducerRt_output :: ' + stateReducerRt_output);
        exec_afterSubmitRespond();
      }
    }, [stateReducerRt_output]);
  }
                                   
                                                
                                                                                                                                                                                  

  return (
    <ul>
      {inputOutputDisplay === InputOutputDisplay.Input1 || inputOutputDisplay === InputOutputDisplay.Input1Output1 ? (
        <li>
          <label>
            idSql:
            <input type="text" onChange={(event) => setStateRt_input(parseInt(event.target.value))} />
          </label>
        </li>
      ) : null}

      <li>
        <button
          className={cssPanel.buttonNt}
          onClick={async (event) => {
            if (inputOutputDisplay === InputOutputDisplay.Input1 || inputOutputDisplay === InputOutputDisplay.Input1Output1) {
              if (stateRt_input === null) {
                throw new TypeError();
                                              
                                      
                                          
                                        
              }

                         
                                                                                        
                                                          
                                                                                                                                       
                                                                                                                   
                                     
                                                    
                     
                                              
                                                                                     
                                                                                                         
                                                                                                                 
                                                
                                
                                                                        

              const result = await exec_onSubmit(stateRt_input);
              dispatchStateReducerRt_output(result);
            } else {
              const result = await exec_onSubmit();
              dispatchStateReducerRt_output(result);
            }
          }}
        >
          {exec_onSubmit.name}
        </button>
      </li>

      {inputOutputDisplay === InputOutputDisplay.Output1 || inputOutputDisplay === InputOutputDisplay.Input1Output1 ? (
        <li>
          {                                                                                                        }
          {                                                                                         }
          <pre className={styles.codeOutputLarge}>{stateReducerRt_output.stateRt_output + ''}</pre>
        </li>
      ) : null}

      {                            }
      <li>
        {                                                  }
        {                                          }
        <pre>{stateReducerRt_output.stateRt_timeOutput + ''}</pre>
      </li>
    </ul>
  );
};

               
               

type VehicleSceneProps = {
  stateRt_arrVehicle: Vehicle[];
  get_arrVehicle: Function;
};

const VehicleScene: React.FC<VehicleSceneProps> = ({ stateRt_arrVehicle, get_arrVehicle }) => {
  async function rpc_createVehicleDemo01() {
    console.log('>> rpc_createVehicleDemo01()');
    try {
      const methodLinkName = 'createVehicleDemo01';
      const result = await axios.post(url + '/' + methodLinkName);
    } catch (err) {
                                   
      console.error(err);
    }
    get_arrVehicle();
  }

  return (
    <>
      <button className={cssPanel.buttonNt} onClick={(event) => rpc_createVehicleDemo01()}>
        createVehicleDemo01
      </button>
      <button className={cssPanel.buttonNt} onClick={(event) => get_arrVehicle()}>
        get_arrVehicle
      </button>
      <Table list={stateRt_arrVehicle} />
    </>
  );
};

               
               

type SearchPanelProps = {
  stateRt_arrVehicle: Vehicle[];
};

const SearchPanel: React.FC<SearchPanelProps> = ({ stateRt_arrVehicle }) => {
  const [searchFor_VehicleBrand, setStateRt_searchFor_VehicleBrand] = React.useState('');

  const execOnInput_Search_VehicleBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
                                                
                                                                       
    setStateRt_searchFor_VehicleBrand(event.target.value);
  };

                                                                                    
                                                
                      
                                                     
                     
               
                                                                                         
        
        

    
                                                                                                                         
       
                                               
                        
                              
                          
       
                                                                                                  

  const { stateRt_arr_SearchedVehicle, setstateRt_arr_SearchedVehicle } = React.useContext(SearchContext);

  React.useEffect(() => {
    setstateRt_arr_SearchedVehicle(
      stateRt_arrVehicle.filter(function (vehicle_curr) {
        if (vehicle_curr.brandVehicle === null) {
          return false;
        } else if (vehicle_curr.brandVehicle === '') {
          return true;
        } else {
          return new RegExp(searchFor_VehicleBrand, 'gi').test(vehicle_curr.brandVehicle);
        }
      })
    );
                                    
  }, [stateRt_arrVehicle, searchFor_VehicleBrand]);                                                                           

  return (
    <div className={styles.rightSearchPanel}>
      <SearchForm execOnInput_Search_Item={execOnInput_Search_VehicleBrand} searchFor_Item={searchFor_VehicleBrand} />
      {                                          }
      <Table list={stateRt_arr_SearchedVehicle} />
    </div>
  );
};

               

type SearchFormProps = {
  searchFor_Item: string;
  execOnInput_Search_Item: (event: React.ChangeEvent<HTMLInputElement>) => void;
                                                                       
};

const SearchForm: React.FC<SearchFormProps> = ({ searchFor_Item: searchFor_Item, execOnInput_Search_Item: execOnSearchItemInput }) => (
  <>
    <label>Search Brand: </label>
    <input type="text" onChange={execOnSearchItemInput} />
  </>
);

       

type ListProps = {
  list: Vehicle[];
};

const List: React.FC<ListProps> = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item.idBsi}>
        <span>{item.idBsi}</span>
        <span>{item.vehicleNum}</span>
        <span>{item.vehicleType}</span>
        <span>{item.brandVehicle}</span>
      </li>
    ))}
  </ul>
);

const Table: React.FC<ListProps> = ({ list }) => {
                                    

  return (
    <table>
      <thead>
        <tr>
          {                                                                  
                                                                              
                                                                               
                                                                                   }
          <th>{'idSql'}</th>
          <th>{'idBsi'}</th>
          <th>{'vehicleNum'}</th>
          <th>{'vehicleType'}</th>
          <th>{'brandVehicle'}</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.idBsi}>
            <td>{item.idSql}</td>
            <td>{item.idBsi}</td>
            <td>{item.vehicleNum}</td>
            <td>{item.vehicleType}</td>
            <td>{item.brandVehicle}</td>
          </tr>
        ))}
      </tbody>
      <caption>Table of Items</caption>
    </table>
  );
};

               
               

                                                                                                                   
                                                         
                                                        
                            
    

               
               

export default App;
