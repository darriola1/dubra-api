import { PrismaClient } from '@/generated/prisma/client';
import { UserDatasource } from '@/infrastructure/data/prisma/user.datasource';
import { OrderDatasource } from '@/infrastructure/data/prisma/order.datasource';
import { RegisterUserUseCase } from '@/application/use-cases/user/register-user.use-case';
import { LoginUserUseCase } from '@/application/use-cases/user/login-user.use-case';
import { ChangePasswordUserUseCase } from '@/application/use-cases/user/change-password-user.use-case';
import { CreateOrderUseCase } from '@/application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from '@/application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from '@/application/use-cases/order/find-order-by-id.use-case';
import { UpdateOrderUseCase } from '@/application/use-cases/order/update-order.use-case';
import { DeleteOrderUseCase } from '@/application/use-cases/order/delete-order.use-case';
import { AuthController } from '@/infrastructure/http/controllers/auth.controller';
import { OrderController } from '@/infrastructure/http/controllers/order.controller';

// Prisma singleton
const prisma = new PrismaClient();

// Datasources
const userDatasource = new UserDatasource(prisma);
const orderDatasource = new OrderDatasource(prisma);

// Use cases
const registerUser = new RegisterUserUseCase(userDatasource);
const loginUser = new LoginUserUseCase(userDatasource);
const changePasswordUser = new ChangePasswordUserUseCase(userDatasource);

const createOrder = new CreateOrderUseCase(orderDatasource);
const findAllOrders = new FindAllOrdersUseCase(orderDatasource);
const findOrderById = new FindOrderByIdUseCase(orderDatasource);
const updateOrder = new UpdateOrderUseCase(orderDatasource);
const deleteOrder = new DeleteOrderUseCase(orderDatasource);

// Controllers
export const authController = new AuthController(registerUser, loginUser, changePasswordUser);
export const orderController = new OrderController(
  createOrder,
  findAllOrders,
  findOrderById,
  updateOrder,
  deleteOrder
);

export const container = {
  prisma,
  userDatasource,
  orderDatasource,
  registerUser,
  loginUser,
  changePasswordUser,
  createOrder,
  findAllOrders,
  findOrderById,
  updateOrder,
  deleteOrder,
  authController,
  orderController,
};
