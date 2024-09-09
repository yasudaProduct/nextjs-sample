import prisma from "@/lib/prisma";
import { ArticleProps } from "@/types/Article";
import { GetStaticProps } from "next";
import Router from "next/router";
import React from "react";

type Props = {
  articles: ArticleProps[];
};

const Articles = (props: Props) => {
  return (
    <div className="container mx-auto">
      <div className="mt-10 w-full px-8">
        <div className="flex flex-wrap">          
          {props.articles.map((article) => (
            <div
              key={article.id}
              className="w-full cursor-pointer px-2 lg:w-4/12"
              onClick={() => Router.push(`/articles/${article.id}`)}
            >
              <div className="relative mt-4 flex flex-col">
                <div className="flex-auto px-4 py-5">
                  <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-center shadow-sm"></div>
                  <h6 className="mb-1 text-xl font-semibold">
                    {article.title}
                  </h6>
                  <p className="text-blueGray-500 mb-4 truncate hover:text-clip">
                    {article.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await prisma.article.findMany();
  return {
    props: { articles },
  };
};
