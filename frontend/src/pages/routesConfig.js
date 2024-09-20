import { BiAlignLeft } from 'react-icons/bi';
import { IoSettings } from "react-icons/io5";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

const routesConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    messageId: 'Dashboard',
    type: 'item',
    icon: <FaHome />,
    url: '/sample/Dashboard',
  },
  {
    id: 'admin',
    title: 'Admin',
    messageId: 'Admin',
    type: 'group',
    children: [
      {
        id: 'role2',
        title: 'Role',
        messageId: 'Role',
        type: 'item',
        icon: <IoSettings />,
        url: '/sample/Role2',
      },
      {
        id: 'banner',
        title: 'Banner',
        messageId: 'Banner',
        type: 'item',
        icon: <RiAdvertisementFill />,
        url: '/sample/Banner',
      },
      {
        id: 'messages',
        title: 'Messages',
        messageId: 'Messages',
        type: 'item',
        icon: <MdMessage />,
        url: '/sample/Messages',
      },
      {
        id: 'staff',
        title: 'Staff',
        messageId: 'Staff',
        type: 'item',
        icon: <FaUsers />,
        url: '/sample/Staff',
      },
      {
        id: 'branch',
        title: 'Branch',
        messageId: 'Branch',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/Branch',
      },
      {
        id: 'floor',
        title: 'Floor',
        messageId: 'Floor',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/Floor',
      },
      {
        id: 'room',
        title: 'Room',
        messageId: 'Room',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/Room',
      },
      {
        id: 'package',
        title: 'Package',
        messageId: 'Package',
        type: 'item',
        icon: <FiPackage />,
        url: '/sample/Package',
      },
    ]
  },
  {
    id: 'users',
    title: 'Users',
    messageId: 'Users',
    type: 'group',
    children: [
      {
        id: 'members-info',
        title: 'Members Info',
        messageId: 'Members Info',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/MembersInfo',
      },
      {
        id: 'purchase-details',
        title: 'Purchase Details',
        messageId: 'Purchase Details',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/PurchaseDetails',
      },
      {
        id: 'booking',
        title: 'Booking',
        messageId: 'Booking',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/Booking',
      },
      {
        id: 'bookings-checkin',
        title: 'Bookings CheckIn',
        messageId: 'Bookings CheckIn',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/BookingsCheckIn',
      },
      {
        id: 'transfer-package',
        title: 'Transfer Package',
        messageId: 'Transfer Package',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/TransferPackage',
      },
      {
        id: 'attendance-info',
        title: 'Attendance Info',
        messageId: 'Attendance Info',
        type: 'item',
        icon: <BiAlignLeft/>,
        url: '/sample/AttendanceInfo',
      },
      {
        id: 'app',
        title: 'Financial Report',
        messageId: 'Financial Report',
        type: 'collapse',
        children: [
          {
            id: 'usage-report',
            title: 'Usage Report',
            messageId: 'Usage Report',
            type: 'item',
            icon: <BiAlignLeft/>,
            url: '/sample/UsageReport',
          },
          {
            id: 'package-report',
            title: 'Package Report',
            messageId: 'Package Report',
            type: 'item',
            icon: <BiAlignLeft/>,
            url: '/sample/PackageReport',
          },
        ]
      },
    ]
  },
];
export default routesConfig;
