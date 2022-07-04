import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Kotlin 与 Spring Boot',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
          Sisyphus 使用 <a href='https://kotlinlang.org/'>Kotlin </a>
          与 <a href='https://spring.io/projects/spring-boot'>Spring Boot </a>
          构建基于协程的异步 gRPC 服务。
      </>
    ),
  },
  {
    title: '专注于构建优雅的 API',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
          Sisyphus 提供了所有用于遵循 <a href='https://google.aip.dev/'>Google AIP</a> 规范的工具与方法。
      </>
    ),
  },
  {
    title: '全程覆盖的最佳实践',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
          Sisyphus 覆盖了整个 API 的生命周期，从设计、实现、调试、测试到最后的部署，
          甚至是更新都能在 Sisyphus 中找到最佳实践。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
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
  );
}
