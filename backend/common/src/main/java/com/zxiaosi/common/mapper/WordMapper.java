package com.zxiaosi.common.mapper;

import com.zxiaosi.common.entity.Word;

import java.util.List;

/**
 * @author zxiaosi
 * @date 2024/8/22 下午11:39
 */
public interface WordMapper {

    /**
     * 获取对应的题库根据类型
     *
     * @param type 类型
     */
    List<Word> getWordListByType(Integer type);

    /**
     * 获取题库详情根据Id与类型
     *
     * @param id   id
     * @param type 类型
     */
    Word getWordByIdAndType(Integer id, Integer type);

    /**
     * 更新题库
     *
     * @param word 单词
     */
    void updateWord(Word word);

    /**
     * 获取收藏单词列表根据类型
     */
    List<Word> getFavoritesWordListByType(Integer type);
}
