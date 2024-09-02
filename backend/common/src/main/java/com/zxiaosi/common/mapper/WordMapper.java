package com.zxiaosi.common.mapper;

import com.zxiaosi.common.entity.Word;

import java.util.List;

/**
 * @author zxiaosi
 * @date 2024/8/22 下午11:39
 */
public interface WordMapper {

    /**
     * 获取单词列表
     */
    List<Word> getWordList();

    /**
     * 获取单词详情
     */
    Word getWordDetail(Integer id);

    /**
     * 添加单词
     */
    void addWord(Word word);

    /**
     * 更新单词
     */
    void updateWord(Word word);

    /**
     * 收藏单词
     */
    void favoritesWord(Integer id);

    /**
     * 取消收藏单词
     */
    void cancelFavoritesWord(Integer id);

    /**
     * 获取收藏单词列表
     */
    List<Word> getFavoritesWordList();
}
