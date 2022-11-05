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
        title: translate({id: 'homepage.features.1.title', message: 'Kotlin and Spring Boot'}),
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <Translate id="homepage.features.1.description" values={{
                kotlin: <a href="https://kotlinlang.org/"> Kotlin </a>,
                spring: <a href="https://spring.io/projects/spring-boot"> Spring Boot </a>
            }}>
                {'Sisyphus uses {kotlin} and {spring} to build a coroutine-based asynchronous gRPC service.'}
            </Translate>
        )
    },
    {
        title: translate({id: 'homepage.features.2.title', message: 'Progressive Microservicing'}),
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <Translate id="homepage.features.2.description">
                {'Macroservice design helps projects transition progressively from mono-application to microservice as they grow.'}
            </Translate>
        )
    },
    {
        title: translate({id: 'homepage.features.3.title', message: 'Best practices for designing API'}),
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <Translate id="homepage.features.3.description" values={{
                aip: <a href="https://google.aip.dev/">
                    <Translate id="homepage.features.3.description.aip">
                        Google's best practices
                    </Translate>
                </a>
            }}>
                {'Easily design APIs that meet {aip} with Sisyphus.'}
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
