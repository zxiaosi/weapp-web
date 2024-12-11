package com.zxiaosi.common.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * 题库实体类
 *
 * @author zxiaosi
 * @date 2024/8/22 下午11:22
 */
@Data
public class Word implements Serializable {

    /**
     * id
     */
    private Integer id;

    /**
     * 标题
     */
    private String title;

    /**
     * 翻译
     */
    private String translation;

    /**
     * 收藏
     */
    private Integer favorites;

    /**
     * 类型
     * - 1: 题库本
     * - 2: 药理大题
     * - 3: 中化大题
     */
    private Integer type;
}
