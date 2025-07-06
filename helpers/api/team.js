import timg1 from '../images/team/1.png';
import timg2 from '../images/team/2.png';
import timg3 from '../images/team/3.png';
import timg4 from '../images/team/4.png';
import timg5 from '../images/team/5.png';
import timg6 from '../images/team/6.png';

const Teams = [
    {
        id: '1',
        name: 'مارلين هنري',  // Changed from title to name
        specialization: 'جراح',  // Changed from subtitle to specialization
        slug: 'Marlene-Henry',
        image: timg1,  // Changed from timg to image
        branches: ['alawali', 'alkhalidiyah'],  // Added branches array
    },
    {
        id: '2',
        name: 'ديان راسل',
        specialization: 'أخصائية قلب',
        slug: 'Dianne-Russell',
        image: timg2,
        branches: ['alshatee', 'albasateen'],
    },
    {
        id: '3',
        name: 'جيروم بيل',
        specialization: 'اختصاصي أمراض الحيوانات',
        slug: 'Jerome-Bell',
        image: timg3,
        branches: ['alkhalidiyah'],
    },
    {
        id: '4',
        name: 'ليسلي ألكسندر',
        specialization: 'جراح',
        slug: 'Leslie-Alexander',
        image: timg4,
        branches: ['alawali', 'alshatee', 'albasateen'],
    },
    {
        id: '5',
        name: 'ألكسندر ليسلي',
        specialization: 'أخصائي قلب',
        slug: 'Alexander-Leslie',
        image: timg5,
        branches: ['abhur'],
    },
    {
        id: '6',
        name: 'كودي فيشر',
        specialization: 'جراح',
        slug: 'Cody-Fisher',
        image: timg6,
        branches: ['altaif'],
    },
];

export default Teams;