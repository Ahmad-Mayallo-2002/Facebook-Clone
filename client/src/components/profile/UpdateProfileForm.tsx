import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function UpdateProfileForm() {
  const selectedClassName = "border-blue-500 border-b-2 text-blue-500";
  const className = "cursor-pointer py-2 grow text-center hover:bg-gray-200";
  return (
    <>
      <Tabs defaultIndex={0} defaultFocus={true}>
        <TabList className="flex border-y-2 bg-white border-gray-200">
          <Tab selectedClassName={selectedClassName} className={className}>
            Profile Picture
          </Tab>
          <Tab selectedClassName={selectedClassName} className={className}>
            Cover Picture
          </Tab>
          <Tab selectedClassName={selectedClassName} className={className}>
            Details
          </Tab>
        </TabList>

        <div className="panels p-4">
          <TabPanel>Profile Picture</TabPanel>
          <TabPanel>Cover Picture</TabPanel>
          <TabPanel>Details</TabPanel>
        </div>
      </Tabs>
    </>
  );
}
