import * as React from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import {useSearchParams} from "react-router-dom";
import {displayAlertMessage, Variant} from "../../Slices/AlertMessageSlices";


type DelDQEProps = {
 data:any;
 refresh:(params:any)=>void,
};
const DelDQE: React.FC<DelDQEProps> = (props) => {
    const dispatch=useDispatch();
    const [searchParams] = useSearchParams();
    const Delete = async() => {
       const rowData:any =  props.data;
       if(rowData){
           await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api_gc/deldqe/`, {
               headers: {
                  Authorization: `Token ${Cookies.get("token")}`,
                  'Content-Type': 'application/json',
                },
               data:{id:[rowData['id']]},

            })
            .then(response => {
                const paramsArray = Array.from(searchParams.entries());
                const queryString = paramsArray.reduce((acc, [key, value], index) => {
                  if (index === 0) {
                    return `?${key}=${encodeURIComponent(value)}`;
                  } else {
                    return `${acc}&${key}=${encodeURIComponent(value)}`;
                  }
                }, '');

                props.refresh(queryString);
                dispatch(displayAlertMessage({variant: Variant.SUCCESS, message: "DQE Annulé"}))

            })
            .catch(error => {
            });
       }

    }

    return (<>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={Delete}

        >
          <i className="far fa-trash-alt" style={{fontSize: 16, marginRight: 9}}/>
          Annuler
      </button>


  </>);
};

export default DelDQE;
