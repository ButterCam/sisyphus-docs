import Translate, {translate} from '@docusaurus/Translate'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: translate({message: 'Kotlin and Spring Boot'}),
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <Translate values={{
                kotlin: <a href="https://kotlinlang.org/"> Kotlin </a>,
                spring: <a href="https://spring.io/projects/spring-boot"> Spring Boot </a>
            }}>
                {'Sisyphus uses {kotlin} and {spring} to build a coroutine-based asynchronous gRPC service.'}
            </Translate>
        )
    },
    {
        title: translate({message: 'Focus on building elegant APIs'}),
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <Translate values={{
                aip: <a href="https://google.aip.dev/">Google AIP</a>
            }}>
                {'Sisyphus provides all the tools to design APIs for following the {aip}.'}
            </Translate>
        )
    },
    {
        title: translate({message: 'Best Practices Covered Throughout'}),
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <Translate>
                Sisyphus covers the entire API lifecycle,
                from design, implementation, debugging, testing to final deployment.
            </Translate>
        )
    }
]

function Feature({title, Svg, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    )
}
