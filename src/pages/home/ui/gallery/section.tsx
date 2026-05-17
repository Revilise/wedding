import { Section } from '@ui/section';
import { gallerySection } from './mock.ts';
import { Image } from '@ui/image';
import { Swiper, SwiperSlide } from '@ui/swiper';
import { Autoplay } from 'swiper/modules';

export const GallerySection = () => {
    return (
        <Section
            extraCN={{ isGallery: true, isLarge: true }}
            heading={(
                <>
                    <h2 className={"h2 align-right"}>О нас</h2>
                    <p className={"align-right"}>Мы познакомились в колледже - учились на одной специальности. Спустя несколько лет дружба переросла в что-то большее. “Что-то большее” затем стало желанием стать семьёй.</p>
                </>
            )}
        >
            <Swiper
                slidesPerView={1}
                spaceBetween={16}
                loop={true}
                autoplay={{
                    delay: 2000
                }}
                speed={1000}
                modules={[Autoplay]}
                breakpoints={{
                    "768": {
                        slidesPerView: 3
                    }
                }}
            >
                {gallerySection.images.map(image => (
                    <SwiperSlide>
                        <Image src={image} alt={""} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    )
}
