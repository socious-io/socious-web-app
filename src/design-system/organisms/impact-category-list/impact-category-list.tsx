import {ImpactCategoryItem} from '../../../../src/design-system/molecules/impact-category-item/impact-category-item';
import css from './impact-category-list.module.scss';
import {ImpactCategoryListProps} from './impact-category-list.types';

export const ImpactCategoryList = ({
  data,
}: ImpactCategoryListProps): JSX.Element => {
  return (
    <div className={css.container}>
      {data.map((category) => (
        <ImpactCategoryItem key={category.name} />
      ))}
    </div>
  );
};
