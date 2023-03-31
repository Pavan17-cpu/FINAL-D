import React from "react";
import logo from './img1.jpg'
import logo1 from './img2.jpg'
import logo2 from './img3.jpg'
import './About.css'

const About = () => {
return (
	<div className="pri">
    
	
        <table className="pri2">
  <tr styles={{width: '50%'}} >
    <th styles={{width: '50%'}}>NAME</th>
    <th styles={{width: '50%'}}>ID</th>
   
    <th styles={{width: '50%'}}>Email Id</th>
    <th styles={{width: '50%'}}>Contribution</th>
    <th styles={{width: '50%'}}>IMAGE</th>
  </tr>
   <tr styles={{width: '50%'}}>
    <td styles={{width: '50%'}}>S.FAISAL AMANULLA</td>
    <td styles={{width: '50%'}}>2100030521</td>
    <td styles={{width: '50%'}}>2100030521@kluniversity.in</td>
    <td styles={{width: '50%'}}>TEAM LEAD,BACKEND DESIGNER EXPRESS AND MONGO DB</td>
    <td styles={{width: '50%'}}><img width='270' src={logo1} alt="FEROSE"/></td>
    
  </tr>
  <tr styles={{width: '50%'}}>
    <td styles={{width: '50%'}}>T.MANIKANTA SAI PAVAN</td>
    <td styles={{width: '50%'}}>21000030548</td>
    <td styles={{width: '50%'}}>2100030548@kluniversity.in</td>
    <td styles={{width: '50%'}}>MODULE DESIGN ,ROUTING AND FRONTEND MUI</td>
    <td styles={{width: '50%'}}><img width='270' src={logo2} alt="RISHI"/></td>
  </tr>
  <tr styles={{width: '50%'}}>
    <td styles={{width: '50%'}}>M.D.FEROSE</td>
    <td styles={{width: '50%'}}>2100030649</td>
    <td styles={{width: '50%'}}>2100030649@kluniversity.in</td>
    <td styles={{width: '50%'}}>FRONT END DEVELOPMENT</td>
    <td styles={{width: '50%'}}><img width='270' src={logo} alt="PRUDHVI"/></td>
  </tr>
</table>
	</div>
);
};

export default About;
