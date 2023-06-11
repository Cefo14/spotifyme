'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/Container';
import sadCheems from '@/assets/sad_cheems.png';

import styles from './error.module.css';

const Error = () => (
  <Container className={styles.container}>
    <h1>Oh no...</h1>
    <h2>We have some emotional and tecnical issues</h2>
    <Image
      alt="sad cheems"
      src={sadCheems}
      width={352}
      height={352}
      priority
    />
    <Link href="/" className={styles.link}>
      Continue
    </Link>
  </Container>
);

export default Error;
