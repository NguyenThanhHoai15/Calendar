// import CalendarFilter from "../components/calendar/calendarFilter";
import { useState } from "react";
import CalendarMain from "../components/calendar/calendarMain";
import CalendarNav from "../components/calendar/calendarNav";

export default function CalendarHome() {
    const [drawer, setDrawer] = useState(false);

    const handleDrawer = () => setDrawer(!drawer);

    return (
        <div style={{ display: 'inline' }}>
            <div style={{ float: 'left' }}>
                <CalendarNav
                    drawer={drawer}
                    handleDrawer={handleDrawer}
                />
            </div>
            <div style={drawer ? calendarMain : calendarFull} >
                <CalendarMain />
            </div>
        </div>
    )
}

const calendarFull = {
    paddingLeft: 90,
    paddingRight: 20,
    backgroundColor: '#F4F6F6',
    height: '100vh'
}

const calendarMain = {
    paddingLeft: 265,
    paddingRight: 20,
    backgroundColor: '#F4F6F6',
    height: '100vh'
}