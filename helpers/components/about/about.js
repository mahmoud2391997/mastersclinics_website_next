import React from 'react';
import CountUp from 'react-countup';

// الصور
import Ab1 from '../../images/about.jpg';
import Abd1 from '../../images/doctors/1.jpg';
import Abd2 from '../../images/doctors/2.jpg';
import Abd3 from '../../images/doctors/3.jpg';
import Abd4 from '../../images/doctors/4.jpg';
import sine from '../../images/signeture.png';

const AboutArabic = (props) => {
  return (
    <section dir="rtl" className={props.hclass}>
      <div className="container">
        <div className="row align-items-center">
          {/* صورة */}
          <div className="col-lg-6 col-12 order-lg-2">
            <div className="about_left">
              <div className="image relative">
                <img src={Ab1} alt="صورة عن العيادة" />
                <span className="round-on"></span>
                <span className="round-two"></span>
                <div className="award">
                  <div className="icon">
                    <i className="flaticon-cup"></i>
                  </div>
                  <div className="text">
                    <h2><CountUp end={25} enableScrollSpy />+</h2>
                    <p>سنوات من الخبرة</p>
                  </div>
                </div>
                <div className="doctors">
                  <ul>
                    <li><img src={Abd1} alt="طبيب" /></li>
                    <li><img src={Abd2} alt="طبيب" /></li>
                    <li><img src={Abd3} alt="طبيب" /></li>
                    <li><img src={Abd4} alt="طبيب" /></li>
                    <li><span>95+</span></li>
                  </ul>
                  <h4>أطباء متاحون</h4>
                </div>
              </div>
            </div>
          </div>

          {/* محتوى نصي */}
          <div className="col-lg-6 col-12 order-lg-1">
            <div className="content text-right">
              <h2>عن عيادات ماسترز</h2>
              <h3>رؤيتنا، رسالتنا، وأهدافنا</h3>
              <p>
                نلتزم في عيادات ماسترز بتقديم خدمات طبية متخصصة ومتطورة وعالية الجودة لجميع المواطنين والحجاج والزائرين،
                ونسعى دائمًا للتطوير المستمر والارتقاء بجودة وسلامة الخدمات الطبية.
              </p>

              {/* الرؤية */}
              <div className="mb-4">
                <h4 className="text-[#dec06a] font-bold">الرؤية</h4>
                <p>
                  تطلع عيادات ماسترز للتطوير المستمر والارتقاء بجودة وسلامة الخدمات الطبية المقدمة في المجمع،
                  وذلك للحصول على شهادة الاعتماد الوطني والدولي.
                </p>
              </div>

              {/* الرسالة */}
              <div className="mb-4">
                <h4 className="text-[#dec06a] font-bold">الرسالة</h4>
                <p>
                  الالتزام بتقديم خدمات طبية متخصصة ومتطورة وعالية الجودة لجميع المواطنين والحجاج والزائرين.
                </p>
              </div>

              {/* الأهداف */}
              <div className="mb-4">
                <h4 className="text-[#dec06a] font-bold">الأهداف</h4>
                <p>
                  • التطوير المستمر والارتقاء بجودة وسلامة الخدمات الطبية المقدمة في المجمع للحصول على شهادة الاعتماد الوطني والدولي.<br />
                  • الحفاظ على تحديث كفاءة الفريق الطبي من خلال التدريب المستمر والتعليم.<br />
                  • تحسين البنية التحتية للمجمع عبر التطوير الدائم للأنظمة والمرافق.
                </p>
              </div>

              {/* القيم */}
              <div className="mb-4">
                <h4 className="text-[#dec06a] font-bold">القيم</h4>
                <p>
                  سلامة المريض ورضاؤه، الأمانة، الاحترام، جودة الأداء، العمل بروح الفريق الواحد،
                  التميز والإبداع، الثقة والسرية.
                </p>
              </div>

              {/* التوقيع */}
              <div className="ceo mt-6 flex items-center justify-between">
                <div>
                  <h4>سافانا نغوين</h4>
                  <span>المدير التنفيذي ومؤسس عيادات ماسترز</span>
                </div>
                <div>
                  <img src={sine} alt="توقيع" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutArabic;
