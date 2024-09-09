package com.ABCResturent.app.repo;

import com.ABCResturent.app.dto.queryInterface.OrderDetailsInterface;
import com.ABCResturent.app.entity.Order;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface OrderRepo  extends JpaRepository<Order,Integer> {

    @Query(value = "select u.user_name as userName, u.user_address as userAddress, u.user_contact as userContact, o.order_date as orderDate, o.total as total, od.meal_item_name as mealName, od.qty as qty from user u join orders o on u.user_id = o.customer_id join orders_details od on o.order_id = od.order_id join meal m on od.meal_id = m.meal_id", nativeQuery = true)
    List<OrderDetailsInterface> getAllOrderDetails(Pageable pageable);
}
