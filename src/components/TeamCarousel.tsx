import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { teamMembers } from '../data/teamMembers';
import unknownUserImage from '@/assets/img/unknown-user.png';
import gunsLogoImage from '@/assets/img/icons/guns.lol-logo-black.png';

interface TeamCarouselProps {
  currentLang: string;
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({ currentLang }) => {
  return (
    <section className="py-24 section-background">
      <div className="py-8 px-4 mx-auto max-w-6xl lg:py-16 relative">
        <p className="extraBoldText text-white opacity-90 mt-8 mb-4 sm:px-16 lg:px-48">
          <span className="gradientColor"><b>Team</b></span>
        </p>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            680: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="team-swiper"
          initialSlide={1}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#1a1a1a] bg-opacity-80 backdrop-blur-sm rounded-xl p-8 border border-[var(--secondaryColor)]/20 transform hover:scale-105 transition-all duration-300">
                <img 
                  className="card-img-top" 
                  src={member.avatar} 
                  alt={member.username} 
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = unknownUserImage;
                  }}
                />
                <div className="card-body">
                  <h5>
                    {member.username}<br />
                    <span>{member.role[currentLang]}</span>
                  </h5>
                  <p className="card-text">
                    "{member.desc[currentLang]}"
                  </p>
                  <a href={member.link} target="_blank" rel="noopener noreferrer">
                    <button type="button" className="normalTextBold text-black button-color rounded-full px-3 py-1 text-center mb-2">
                      {member.type === "github" ? (
                        <><i className="fab fa-github"></i> GitHub</>
                      ) : (
                        <><img
                          src={gunsLogoImage}
                          alt="Guns.lol logo"
                          style={{
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px"
                          }}
                        /> Guns.lol</>
                      )}
                    </button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamCarousel;
