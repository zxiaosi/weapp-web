package com.zxiaosi.weapp.service;

import com.zxiaosi.common.entity.Word;

import java.util.List;

/**
 * 单词服务
 *
 * @author zxiaosi
 * @date 2024/8/22 下午11:31
 */
public interface WordService {

    /**
     * 获取单词列表
     *
     * @return List<Word>
     */
    List<Word> getWordListService();

    /**
     * 获取单词
     *
     * @param id 单词id
     * @return Word
     */
    Word getWordService(Integer id);

    /**
     * 添加单词
     *
     * @param word 单词
     */
    void addWordService(Word word);

    /**
     * 更新单词
     *
     * @param word 单词
     */
    void updateWordService(Word word);

    /**
     * 收藏单词
     *
     * @param id 单词id
     */
    void favoritesWordService(Integer id);

    /**
     * 取消收藏单词
     *
     * @param id 单词id
     */
    void cancelFavoritesWordService(Integer id);

    /**
     * 获取收藏单词列表
     *
     * @return List<Word>
     */
    List<Word> getFavoritesWordListService();
}
