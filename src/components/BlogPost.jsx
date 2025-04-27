import { motion } from 'framer-motion';

const BlogPost = ({ post, language }) => {
    const { title, titleEN, date, content, contentEN, image } = post;

    const fadeInUp = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5 }
    };

    return (
        <motion.div
            className="blog-post"
            whileHover={{ y: -5 }}
            {...fadeInUp}
        >
            {image && (
                <div className="blog-image">
                    <img src={image} alt={language === 'fr' ? title : titleEN} />
                </div>
            )}
            <div className="blog-content">
                <h3>{language === 'fr' ? title : titleEN}</h3>
                <p className="blog-date">{date}</p>
                <p>{language === 'fr' ? content : contentEN}</p>
                <motion.button
                    className="read-more-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {language === 'fr' ? 'Lire plus' : 'Read more'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default BlogPost;