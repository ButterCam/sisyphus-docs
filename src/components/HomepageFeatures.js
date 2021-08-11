import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Kotlin and Spring Boot',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Sisyphus use <a href='https://kotlinlang.org/'>Kotlin </a>
        and <a href='https://spring.io/projects/spring-boot'>Spring Boot </a>
        to build asynchronous gRPC server.
      </>
    ),
  },
  {
    title: 'Focus on build graceful API',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Sisyphus provides all tools you need to build graceful API 
        follow <a href='https://google.aip.dev/'>Google AIP</a>.
      </>
    ),
  },
  {
    title: 'From designing to deploying',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Sisyphus cover the complete API life cycle, designing, 
        implementing, deploying, and debugging.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
  );
}
