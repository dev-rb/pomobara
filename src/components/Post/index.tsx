import * as React from 'react';
import styles from './post.module.css';

const Post = () => {
    return (
        <div className='w-full'>
            <div className={styles.postInfo}>
                <div className={styles.postUser}>
                    <div className={styles.postProfile}>

                    </div>
                    <div className={styles.postUserAndDate}>

                    </div>
                </div>
                <div className={styles.postText}>

                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Post;