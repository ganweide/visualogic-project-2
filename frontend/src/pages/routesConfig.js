import {BiAlignLeft} from 'react-icons/bi';
const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'Surveys',
    type: 'item',
    children: [
      {
        id: 'survey-editor',
        title: 'Survey Editor',
        messageId: 'Survey Editor',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/SurveyEditor',
      },
    ]
  },
];
export default routesConfig;
