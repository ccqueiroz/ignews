import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import styles from './stylesPosts/post.module.scss';

type PostProps = {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
    firstChildIsParagraph: boolean
}

type Props = {
    post: PostProps
}

const Post = ({ post }: Props) => {

    return(
        <>
            <Head>
                <title>{post.slug} | ig.news</title>
            </Head>
            <main className={`${styles.contentMain}`}>
                <article className={`${styles.postArticle}`}>
                    <h1>{post.title}</h1>
                    <time className={post.firstChildIsParagraph ? styles.firstChildContentIsParagraph : ''}>{post.updatedAt}</time>
                    <div className={styles.post} dangerouslySetInnerHTML={{__html: post.content}}/>
                </article>
            </main>
        </>
    );
}

export default Post;

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {

    const {slug} = params;
    const session = await getSession({req});

    if(!session?.activeSubscription){
        return {
            redirect:{
                destination: `/posts/preview/${slug}`,
                permanent: false
            }
        };
    }
    const prismic = getPrismicClient();
    const response = await prismic.getByUID('publication', String(slug), {});

    const post = {
        slug: response.uid,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        firstChildIsParagraph: response.data.content[0].type === "paragraph"
    };

    return {
        props:{
            post
        }
    }
}