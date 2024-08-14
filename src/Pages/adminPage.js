import { useEffect, useState, useContext } from 'react';
import AuthContext from '../store/authContext';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../App.css';

import AddProperty from '../component/property/addProperty';
import PropertiesList from '../component/property/propertiesList';
import AppointmentList from '../component/adminDashboard/appointmentList';
import AcceptedAppList from '../component/adminDashboard/acceptedAppList';
import PendingSaleAppList from '../component/adminDashboard/pendingSaleAppList';
import AcceptedSaleAppList from '../component/adminDashboard/acceptedSaleAppList';
import AdminForm from '../component/adminDashboard/adminForm';

const AdminPage = () => {
    const [key, setKey] = useState('pendingAppointments');
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('token') || sessionStorage.getItem('role') !== 'admin') {
            navigate('/logIn');
        }
    }, [navigate]);

    return (
        <div className="container-fluid" style={{marginTop:"10em"}}>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 custom-tabs"
                justify
            >
                <Tab eventKey="manage" title="Manage Properties">
                    <PropertiesList />
                </Tab>
                <Tab eventKey="pendingAppointments" title="Pending Rent Appointments">
                    <AppointmentList />
                </Tab>
                <Tab eventKey="acceptedAppointments" title="Accepted Rent Appointments">
                    <AcceptedAppList />
                </Tab>
                <Tab eventKey="pendingSaleApp" title="Pending Sale Appointments">
                    <PendingSaleAppList />
                </Tab>
                <Tab eventKey="acceptedSaleApp" title="Accepted Sale Appointments">
                    <AcceptedSaleAppList />
                </Tab>
                <Tab eventKey="addProperty" title="Add Property">
                    <AddProperty />
                </Tab>
                <Tab eventKey="addAdmin" title="Add Admin">
                    <AdminForm />
                </Tab>
            </Tabs>
        </div>
    );
};

export default AdminPage;
