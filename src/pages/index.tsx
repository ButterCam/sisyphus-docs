import Link from '@docusaurus/Link'
import Translate, {translate} from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import React from 'react'

import styles from './index.module.css'

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext()
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">
                    <Translate id="homepage.subtitle">
                        Modern gRPC back-end development framework base on JVM
                    </Translate>
                </p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/getting-started">
                        <Translate id="homepage.quickstart">
                            Quick start with Sisyphus - 5 min ⏱️
                        </Translate>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext()
    return (
        <Layout
            title={translate({id: 'homepage.title', message: `Build gRPC APIs`})}
            description={translate({
                id: 'homepage.description',
                message: `Build more robust and extensible gRPC APIs with AIP`
            })}>
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
            </main>
        </Layout>
    )
}
