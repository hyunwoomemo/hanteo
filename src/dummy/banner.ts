import { Route } from "next";

export interface IBanner {
  id: number;
  title: string;
  image?: string;
  link: Route<string> | URL;
}

export const bannerData: Array<IBanner> = [
  {
    id: 1,
    title: "프로미스나인, 'from our Memento Box'로 커리어 하이 + 한터차트 초동 인증패 수상 (한터차트 공식)",

    image: "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/15/74f05577-7a61-49d7-9a41-eb2239c7bcf1.jpg?now=1740056099010",
    link: "https://www.hanteonews.com/ko/article/all?fc=37283",
  },
  {
    id: 2,
    title: "몬스타엑스, 'SHAPE of LOVE'로 커리어 하이 + 한터차트 실버 인증패 수상 (한터차트 공식)",

    image: "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/06/2e9401b6-d46e-42a7-a3b0-4b9065465fcd.jpg?now=1740060563522",
    link: "https://www.hanteonews.com/ko/article/all?fc=36712",
  },
  {
    id: 3,
    title: "'더블 밀리언 셀러' 세븐틴, 'Face the Sun'으로 한터차트 초동 인증패 수상 (한터차트공식)",

    image: "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/07/82132a7a-ee39-498d-a7f4-c2d984ac33f8.jpg?now=1740060728431",
    link: "https://www.hanteonews.com/ko/article/chart?fc=36776",
  },
  {
    id: 4,
    title: "르세라핌, 'FEARLESS'로 걸그룹 데뷔 초동 신기록 + 한터차트 초동 실버 인증패 수상 (한터차트 공식)",

    image: "https://s3.ap-northeast-2.amazonaws.com/hanteoresource/hanteonews/article/thumbnail/2022/06/29/e3d8a36b-df0a-4798-b4d7-22bbcf2c4d2b.jpg?now=1740060728432",
    link: "https://www.hanteonews.com/ko/article/all?fc=36218",
  },
  {
    id: 5,
    title: "투모로우바이투게더, 최소 연차 '초동 밀리언 인증패' 수상...역대 케이팝 초동 기록 8위 (한터차트 공식)",

    image: "https://s3.ap-northeast-2.amazonaws.com/hanteoresource/hanteonews/article/thumbnail/2022/05/27/362ffe8c-f2de-474f-949a-6b86a50da823.jpg?now=1740060728432",
    link: "https://www.hanteonews.com/ko/article/all?fc=34002",
  },
];
